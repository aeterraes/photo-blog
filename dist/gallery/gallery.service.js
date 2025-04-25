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
exports.GalleryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const image_entity_1 = require("./entities/image.entity");
const typeorm_2 = require("typeorm");
const rxjs_1 = require("rxjs");
let GalleryService = class GalleryService {
    constructor(imageRepository) {
        this.imageRepository = imageRepository;
        this.imageUpdates = new rxjs_1.Subject();
    }
    getImageUpdates() {
        return this.imageUpdates.asObservable();
    }
    async create(createGalleryDto) {
        const image = this.imageRepository.create(createGalleryDto);
        const savedImage = await this.imageRepository.save(image);
        this.imageUpdates.next({ data: { action: 'create', image: savedImage } });
        return savedImage;
    }
    async findAll() {
        return await this.imageRepository.find({
            where: { merchPackage: null },
            select: ['id', 'url'],
        });
    }
    async findOne(id) {
        const image = await this.imageRepository.findOne({
            where: { id },
            select: ['id', 'url'],
        });
        if (!image) {
            throw new common_1.NotFoundException(`Image with ID ${id} not found`);
        }
        return image;
    }
    async update(id, updateGalleryDto) {
        await this.imageRepository.update(id, updateGalleryDto);
        const updatedImage = await this.findOne(id);
        this.imageUpdates.next({
            data: {
                action: 'update',
                image: { id: updatedImage.id, url: updatedImage.url },
            },
        });
        return updatedImage;
    }
    async remove(id) {
        const image = await this.findOne(id);
        await this.imageRepository.delete(id);
        this.imageUpdates.next({
            data: { action: 'delete', image: { id: image.id } },
        });
    }
};
exports.GalleryService = GalleryService;
exports.GalleryService = GalleryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(image_entity_1.Image)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], GalleryService);
//# sourceMappingURL=gallery.service.js.map