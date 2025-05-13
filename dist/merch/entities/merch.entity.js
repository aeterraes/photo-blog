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
exports.Merch = void 0;
const typeorm_1 = require("typeorm");
const image_entity_1 = require("../../gallery/entities/image.entity");
const product_entity_1 = require("../../product/entities/product.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const graphql_1 = require("@nestjs/graphql");
let Merch = class Merch {
};
exports.Merch = Merch;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Merch.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", Number)
], Merch.prototype, "userId", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.User),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.merchPackages, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Merch.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Merch.prototype, "merchType", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Merch.prototype, "designType", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Merch.prototype, "collection", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Merch.prototype, "dateCreated", void 0);
__decorate([
    (0, graphql_1.Field)(() => [product_entity_1.Product], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => product_entity_1.Product, (product) => product.merchPackage),
    __metadata("design:type", Array)
], Merch.prototype, "products", void 0);
__decorate([
    (0, graphql_1.Field)(() => [image_entity_1.Image], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => image_entity_1.Image, (image) => image.merchPackage),
    __metadata("design:type", Array)
], Merch.prototype, "images", void 0);
exports.Merch = Merch = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, graphql_1.InputType)('MerchInput'),
    (0, typeorm_1.Entity)('merch_packages')
], Merch);
//# sourceMappingURL=merch.entity.js.map