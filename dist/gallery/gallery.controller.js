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
exports.GalleryController = void 0;
const common_1 = require("@nestjs/common");
const gallery_service_1 = require("./gallery.service");
const create_gallery_dto_1 = require("./dto/create-gallery.dto");
const update_gallery_dto_1 = require("./dto/update-gallery.dto");
const rxjs_1 = require("rxjs");
const file_manager_service_1 = require("../file/file-manager.service");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
let GalleryController = class GalleryController {
    constructor(galleryService, fileUploader) {
        this.galleryService = galleryService;
        this.fileUploader = fileUploader;
    }
    stream() {
        return this.galleryService.getImageUpdates();
    }
    async getGallery(req) {
        const images = await this.galleryService.findAll();
        return {
            title: 'Gallery',
            isAuthenticated: !!req.user,
            images: images.map((img) => img.url),
            extraCss: ['/css/gallery-style.css'],
            extraJsHead: [
                'https://unpkg.com/swiper/swiper-bundle.min.js',
                '/js/gallery.js',
            ],
            extraJsBody: ['/js/menu-activity.js'],
        };
    }
    addForm(req) {
        return {
            title: 'Add Image',
        };
    }
    async create(file, createGalleryDto, res) {
        if (!file && !createGalleryDto.url) {
            throw new common_1.BadRequestException('URL or file must be provided');
        }
        if (file) {
            const url = await this.fileUploader.uploadFile(file.buffer, file.originalname, file.mimetype);
            createGalleryDto.url = url;
        }
        await this.galleryService.create(createGalleryDto);
        if (res) {
            return res.redirect('/gallery');
        }
        return { status: 'success' };
    }
    async editForm(id, req) {
        const image = await this.galleryService.findOne(+id);
        return {
            title: 'Edit Image',
            isAuthenticated: true,
            image,
        };
    }
    async update(id, file, updateGalleryDto) {
        if (file) {
            const url = await this.fileUploader.uploadFile(file.buffer, file.originalname, file.mimetype);
            updateGalleryDto.url = url;
        }
        await this.galleryService.update(+id, updateGalleryDto);
    }
    async remove(id) {
        await this.galleryService.remove(+id);
    }
};
exports.GalleryController = GalleryController;
__decorate([
    (0, common_1.Sse)('stream'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], GalleryController.prototype, "stream", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)('gallery-page'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GalleryController.prototype, "getGallery", null);
__decorate([
    (0, common_1.Get)('add'),
    (0, common_1.Render)('add-gallery-image'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GalleryController.prototype, "addForm", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        limits: { fileSize: 30 * 1024 * 1024 },
        fileFilter: (req, file, cb) => {
            const allowedMimes = ['image/jpeg', 'image/png'];
            if (allowedMimes.includes(file.mimetype)) {
                cb(null, true);
            }
            else {
                cb(new common_1.BadRequestException('Only image files are allowed'), false);
            }
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_gallery_dto_1.CreateGalleryDto, Object]),
    __metadata("design:returntype", Promise)
], GalleryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id/edit'),
    (0, common_1.Render)('edit-gallery-image'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GalleryController.prototype, "editForm", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, update_gallery_dto_1.UpdateGalleryDto]),
    __metadata("design:returntype", Promise)
], GalleryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.Post)(':id/delete'),
    (0, common_1.Redirect)('/gallery'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GalleryController.prototype, "remove", null);
exports.GalleryController = GalleryController = __decorate([
    (0, swagger_1.ApiExcludeController)(),
    (0, common_1.Controller)('gallery'),
    __metadata("design:paramtypes", [gallery_service_1.GalleryService,
        file_manager_service_1.FileManagerService])
], GalleryController);
//# sourceMappingURL=gallery.controller.js.map