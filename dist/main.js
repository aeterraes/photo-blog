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
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
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
    app.use(cookieParser());
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map