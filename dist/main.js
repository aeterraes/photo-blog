"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const hbs = require("hbs");
const cookieParser = require("cookie-parser");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const elapsed_time_interceptor_1 = require("./interceptors/elapsed-time.interceptor");
const auth_filter_1 = require("./auth/auth.filter");
const express_1 = require("supertokens-node/lib/build/framework/express");
const supertokens_node_1 = require("supertokens-node");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalInterceptors(new elapsed_time_interceptor_1.ElapsedTimeInterceptor());
    app.useGlobalFilters(new auth_filter_1.SupertokensExceptionFilter());
    app.use(cookieParser());
    app.enableCors({
        origin: process.env.SUPERTOKENS_WEBSITE_DOMAIN || 'http://localhost:3001',
        credentials: true,
        allowedHeaders: ['content-type', ...supertokens_node_1.default.getAllCORSHeaders()],
    });
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('PORT') ?? 3001;
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Libre Lente API')
        .setDescription('')
        .setVersion('1.0')
        .addTag('libre_lente')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api-docs', app, document);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'public'));
    app.setBaseViewsDir((0, path_1.join)(__dirname, '..', 'views'));
    app.setViewEngine('hbs');
    app.set('view options', {
        layout: 'layouts/main',
    });
    hbs.registerPartials((0, path_1.join)(__dirname, '..', 'views/partials'));
    app.use((0, express_1.middleware)());
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map