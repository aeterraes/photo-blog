import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AuthStatusMiddleware } from './auth/auth-status.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './db-config.service';
import { GalleryModule } from './gallery/gallery.module';
import { MerchModule } from './merch/merch.module';
import { ProductModule } from './product/product.module';
import { PostModule } from './post/post.module';
import { DataSource } from 'typeorm';

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
    AuthModule,
    UserModule,
    GalleryModule,
    MerchModule,
    ProductModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthStatusMiddleware).forRoutes('*');
  }
}
