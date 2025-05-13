"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AuthModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const supertokens_service_1 = require("./supertokens.service");
const config_interface_1 = require("./config.interface");
const user_module_1 = require("../user/user.module");
let AuthModule = AuthModule_1 = class AuthModule {
    static forRoot(config) {
        return {
            module: AuthModule_1,
            imports: [user_module_1.UserModule],
            providers: [
                {
                    provide: config_interface_1.ConfigInjectionToken,
                    useValue: config,
                },
                supertokens_service_1.SupertokensService,
            ],
            exports: [supertokens_service_1.SupertokensService],
            controllers: [],
        };
    }
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = AuthModule_1 = __decorate([
    (0, common_1.Module)({
        providers: [supertokens_service_1.SupertokensService],
        exports: [],
        imports: [user_module_1.UserModule],
        controllers: [],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map