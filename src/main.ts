import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ElapsedTimeInterceptor } from './interceptors/elapsed-time.interceptor';
import { SupertokensExceptionFilter } from './auth/auth.filter';
import { middleware } from 'supertokens-node/lib/build/framework/express';
import supertokens from 'supertokens-node';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalInterceptors(new ElapsedTimeInterceptor());
  app.useGlobalFilters(new SupertokensExceptionFilter());
  app.use(cookieParser());
  app.enableCors({
    origin: process.env.SUPERTOKENS_WEBSITE_DOMAIN || 'http://localhost:3001',
    credentials: true,
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') ?? 3001;

  const config = new DocumentBuilder()
    .setTitle('Libre Lente API')
    .setDescription('')
    .setVersion('1.0')
    .addTag('libre_lente')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.set('view options', {
    layout: 'layouts/main',
  });
  hbs.registerPartials(join(__dirname, '..', 'views/partials'));

  app.use(middleware());
  await app.listen(port);
}
bootstrap();
