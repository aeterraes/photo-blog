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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerchController = void 0;
const common_1 = require("@nestjs/common");
const merch_service_1 = require("./merch.service");
const create_merch_dto_1 = require("./dto/create-merch.dto");
const update_merch_dto_1 = require("./dto/update-merch.dto");
let MerchController = class MerchController {
    constructor(merchService) {
        this.merchService = merchService;
    }
    create(createMerchDto) {
        return this.merchService.create(createMerchDto);
    }
    findAll() {
        return this.merchService.findAll();
    }
    findOne(id) {
        return this.merchService.findOne(+id);
    }
    update(id, updateMerchDto) {
        return this.merchService.update(+id, updateMerchDto);
    }
    remove(id) {
        return this.merchService.remove(+id);
    }
};
exports.MerchController = MerchController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_merch_dto_1.CreateMerchDto]),
    __metadata("design:returntype", void 0)
], MerchController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MerchController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MerchController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_merch_dto_1.UpdateMerchDto]),
    __metadata("design:returntype", void 0)
], MerchController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MerchController.prototype, "remove", null);
exports.MerchController = MerchController = __decorate([
    (0, common_1.Controller)('merch'),
    __metadata("design:paramtypes", [merch_service_1.MerchService])
], MerchController);
//# sourceMappingURL=merch.controller.js.map