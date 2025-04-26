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
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const update_merch_dto_1 = require("./dto/update-merch.dto");
let MerchController = class MerchController {
    constructor(merchService) {
        this.merchService = merchService;
    }
    checkAuth(req) {
        if (!req.user) {
            throw new common_1.UnauthorizedException();
        }
    }
    showCreateForm(req, res) {
        this.checkAuth(req);
        return {
            title: 'Create Merch Package',
            isAuthenticated: !!req.user,
            user: req.user,
            merchTypes: ['Postcard', 'Poster', 'Pin', 'Shopper'],
            designTypes: ['Custom', 'Classic'],
            collections: ['New Autumn', 'Classic', 'Forest Vibes'],
            extraCss: ['/css/merch-form-style.css'],
            extraJsBody: ['/js/new-table.js'],
        };
    }
    async create(body, req, res) {
        const createMerchDto = {
            merchType: body.merchTypes?.join(', ') || '',
            designType: body.designTypes?.join(', ') || '',
            collection: body.collections?.join(', ') || '',
            products: [],
            images: [],
        };
        await this.merchService.create(createMerchDto, req.user.id);
        return res.redirect('/merch/created');
    }
    createdSuccess(req, res) {
        this.checkAuth(req);
        return {
            title: 'Merch Package Created',
            isAuthenticated: !!req.user,
            user: req.user,
        };
    }
    async findAll(req, res) {
        this.checkAuth(req);
        const packages = await this.merchService.findAllByUser(req.user.id);
        return {
            title: 'My Merch Packages',
            isAuthenticated: !!req.user,
            user: req.user,
            packages,
        };
    }
    async findOne(id, req, res) {
        this.checkAuth(req);
        const merchPackage = await this.merchService.findOne(+id, req.user.id);
        return {
            title: 'Merch Package Details',
            isAuthenticated: !!req.user,
            user: req.user,
            package: merchPackage,
            extraCss: ['/css/merch-details-style.css'],
        };
    }
    async editForm(id, req, res) {
        this.checkAuth(req);
        const merchPackage = await this.merchService.findOne(+id, req.user.id);
        return {
            title: 'Edit Merch Package',
            isAuthenticated: !!req.user,
            user: req.user,
            package: merchPackage,
            merchTypes: ['Postcard', 'Poster', 'Pin', 'Shopper'],
            designTypes: ['Custom', 'Classic'],
            collections: ['New Autumn', 'Classic', 'Forest Vibes'],
            extraCss: ['/css/merch-form-style.css'],
        };
    }
    async update(id, updateMerchDto, req) {
        await this.merchService.update(+id, updateMerchDto, req.user.id);
    }
    async remove(id, req) {
        await this.merchService.remove(+id, req.user.id);
    }
};
exports.MerchController = MerchController;
__decorate([
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MerchController.prototype, "checkAuth", null);
__decorate([
    (0, common_1.Get)('create'),
    (0, common_1.Render)('merch-form'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MerchController.prototype, "showCreateForm", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Redirect)('/merch/created'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], MerchController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('created'),
    (0, common_1.Render)('merch-created'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MerchController.prototype, "createdSuccess", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)('merch-list'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MerchController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.Render)('merch-details'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], MerchController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/edit'),
    (0, common_1.Render)('merch-edit'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], MerchController.prototype, "editForm", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.Redirect)('/merch/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_merch_dto_1.UpdateMerchDto, Object]),
    __metadata("design:returntype", Promise)
], MerchController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.Redirect)('/merch'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MerchController.prototype, "remove", null);
exports.MerchController = MerchController = __decorate([
    (0, common_1.Controller)('merch'),
    __metadata("design:paramtypes", [merch_service_1.MerchService])
], MerchController);
//# sourceMappingURL=merch.controller.js.map