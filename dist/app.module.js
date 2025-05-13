"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const typeorm_1 = require("@nestjs/typeorm");
const db_config_service_1 = require("./db-config.service");
const gallery_module_1 = require("./gallery/gallery.module");
const merch_module_1 = require("./merch/merch.module");
const product_module_1 = require("./product/product.module");
const post_module_1 = require("./post/post.module");
const typeorm_2 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const app_resolver_1 = require("./app.resolver");
const cache_manager_1 = require("@nestjs/cache-manager");
const auth_status_middleware_1 = require("./auth/auth-status.middleware");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(auth_status_middleware_1.AuthRedirectMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: () => db_config_service_1.dataSourceOptions,
                dataSourceFactory: async (options) => {
                    const dataSource = new typeorm_2.DataSource(options);
                    return dataSource.initialize();
                },
            }),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: true,
                playground: true,
            }),
            cache_manager_1.CacheModule.register({
                isGlobal: true,
                ttl: 60,
            }),
            user_module_1.UserModule,
            gallery_module_1.GalleryModule,
            merch_module_1.MerchModule,
            product_module_1.ProductModule,
            post_module_1.PostModule,
            auth_module_1.AuthModule.forRoot({
                connectionURI: process.env.SUPERTOKENS_CONNECTION_URI,
                appInfo: {
                    appName: process.env.SUPERTOKENS_APP_NAME,
                    apiDomain: process.env.SUPERTOKENS_API_DOMAIN,
                    websiteDomain: process.env.SUPERTOKENS_WEBSITE_DOMAIN,
                    apiBasePath: '/auth',
                    websiteBasePath: '/auth',
                },
                apiKey: process.env.NODE_ENV === 'production'
                    ? process.env.SUPERTOKENS_API_KEY
                    : process.env.SUPERTOKENS_API_KEY,
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, app_resolver_1.AppResolver],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map