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
exports.MerchService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const merch_entity_1 = require("./entities/merch.entity");
const user_entity_1 = require("../user/entities/user.entity");
const product_entity_1 = require("../product/entities/product.entity");
const image_entity_1 = require("../gallery/entities/image.entity");
const gallery_service_1 = require("../gallery/gallery.service");
let MerchService = class MerchService {
    constructor(merchRepository, userRepository, productRepository, imageRepository, galleryService) {
        this.merchRepository = merchRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.imageRepository = imageRepository;
        this.galleryService = galleryService;
    }
    async create(createMerchDto, userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const merch = this.merchRepository.create({
            ...createMerchDto,
            user,
            userId,
        });
        const savedMerch = await this.merchRepository.save(merch);
        if (createMerchDto.products?.length) {
            const products = createMerchDto.products.map((productDto) => this.productRepository.create({
                ...productDto,
                merchPackage: savedMerch,
                merchPackageId: savedMerch.id,
            }));
            await this.productRepository.save(products);
        }
        if (createMerchDto.images?.length) {
            const images = createMerchDto.images.map((imageDto) => this.imageRepository.create({
                ...imageDto,
                merchPackage: savedMerch,
                merchPackageId: savedMerch.id,
            }));
            await this.imageRepository.save(images);
        }
        return this.merchRepository.findOne({
            where: { id: savedMerch.id },
            relations: ['products', 'images'],
        });
    }
    async findAllByUser(userId) {
        return this.merchRepository.find({
            where: { userId },
            relations: ['products', 'images'],
            order: { dateCreated: 'DESC' },
        });
    }
    async findOne(id, userId) {
        const merch = await this.merchRepository.findOne({
            where: { id, user: { id: userId } },
            relations: ['products', 'images', 'user'],
        });
        if (!merch) {
            throw new common_1.NotFoundException('Merch package not found');
        }
        const imagesWithData = await Promise.all(merch.images.map(async (image) => {
            try {
                return await this.galleryService.findOne(image.id);
            }
            catch (e) {
                return null;
            }
        }));
        const validImages = imagesWithData.filter((img) => img !== null);
        return {
            ...merch,
            images: validImages,
        };
    }
    async update(id, updateMerchDto, userId) {
        const merch = await this.findOne(id, userId);
        Object.assign(merch, updateMerchDto);
        return this.merchRepository.save(merch);
    }
    async remove(id, userId) {
        const merch = await this.findOne(id, userId);
        await this.merchRepository.remove(merch);
    }
    async findPaginatedByUser(userId, page, limit) {
        return this.merchRepository.findAndCount({
            where: { userId },
            relations: ['products', 'images'],
            order: { dateCreated: 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
        });
    }
};
exports.MerchService = MerchService;
exports.MerchService = MerchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(merch_entity_1.Merch)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(3, (0, typeorm_1.InjectRepository)(image_entity_1.Image)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        gallery_service_1.GalleryService])
], MerchService);
//# sourceMappingURL=merch.service.js.map