import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './db-config.service';
import { GalleryModule } from './gallery/gallery.module';
import { MerchModule } from './merch/merch.module';
import { ProductModule } from './product/product.module';
import { PostModule } from './post/post.module';
import { DataSource } from 'typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthRedirectMiddleware } from './auth/auth-status.middleware';
import { StatsService } from './stats/stats.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CountingInterceptor } from './interceptors/counting.interceptor';
import { StatsController } from './stats/stats.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => dataSourceOptions,
      dataSourceFactory: async (options) => {
        const dataSource = new DataSource(options);
        return dataSource.initialize();
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      introspection: true,
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 60,
    }),
    UserModule,
    GalleryModule,
    MerchModule,
    ProductModule,
    PostModule,
    AuthModule.forRoot({
      connectionURI: process.env.SUPERTOKENS_CONNECTION_URI!,
      appInfo: {
        appName: process.env.SUPERTOKENS_APP_NAME!,
        apiDomain: process.env.SUPERTOKENS_API_DOMAIN!,
        websiteDomain: process.env.SUPERTOKENS_WEBSITE_DOMAIN,
        apiBasePath: '/auth',
        websiteBasePath: '/auth',
      },
      apiKey:
        process.env.NODE_ENV === 'production'
          ? process.env.SUPERTOKENS_API_KEY!
          : process.env.SUPERTOKENS_API_KEY,
    }),
  ],
  controllers: [AppController, StatsController],
  providers: [
    AppService,
    AppResolver,
    StatsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CountingInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthRedirectMiddleware).forRoutes('*');
  }
}
