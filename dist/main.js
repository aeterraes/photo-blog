"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const hbs = require("hbs");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('PORT') ?? 3001;
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'public'));
    app.setBaseViewsDir((0, path_1.join)(__dirname, '..', 'views'));
    app.setViewEngine('hbs');
    app.set('view options', {
        layout: 'layouts/main',
    });
    hbs.registerPartials((0, path_1.join)(__dirname, '..', 'views/partials'));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: true }));
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map