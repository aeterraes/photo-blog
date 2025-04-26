"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerchModule = void 0;
const common_1 = require("@nestjs/common");
const merch_service_1 = require("./merch.service");
const merch_controller_1 = require("./merch.controller");
const typeorm_1 = require("@nestjs/typeorm");
const merch_entity_1 = require("./entities/merch.entity");
const product_entity_1 = require("../product/entities/product.entity");
const image_entity_1 = require("../gallery/entities/image.entity");
const user_entity_1 = require("../user/entities/user.entity");
const gallery_module_1 = require("../gallery/gallery.module");
const merch_api_controller_1 = require("./merch-api.controller");
let MerchModule = class MerchModule {
};
exports.MerchModule = MerchModule;
exports.MerchModule = MerchModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([merch_entity_1.Merch, product_entity_1.Product, image_entity_1.Image, user_entity_1.User]),
            gallery_module_1.GalleryModule,
        ],
        controllers: [merch_controller_1.MerchController, merch_api_controller_1.MerchApiController],
        providers: [merch_service_1.MerchService],
        exports: [merch_service_1.MerchService],
    })
], MerchModule);
//# sourceMappingURL=merch.module.js.map