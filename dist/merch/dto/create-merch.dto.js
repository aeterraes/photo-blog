"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMerchDto = void 0;
const create_product_dto_1 = require("../../product/dto/create-product.dto");
const create_gallery_dto_1 = require("../../gallery/dto/create-gallery.dto");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateMerchDto {
}
exports.CreateMerchDto = CreateMerchDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Poster' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMerchDto.prototype, "merchType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Custom' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMerchDto.prototype, "designType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'New Collection' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMerchDto.prototype, "collection", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [create_product_dto_1.CreateProductDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_product_dto_1.CreateProductDto),
    __metadata("design:type", Array)
], CreateMerchDto.prototype, "products", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [create_gallery_dto_1.CreateGalleryDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_gallery_dto_1.CreateGalleryDto),
    __metadata("design:type", Array)
], CreateMerchDto.prototype, "images", void 0);
//# sourceMappingURL=create-merch.dto.js.map