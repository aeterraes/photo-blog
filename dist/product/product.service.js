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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./entities/product.entity");
const gallery_service_1 = require("../gallery/gallery.service");
let ProductService = class ProductService {
    constructor(productRepository, galleryService) {
        this.productRepository = productRepository;
        this.galleryService = galleryService;
    }
    async create(createProductDto) {
        const product = this.productRepository.create(createProductDto);
        return await this.productRepository.save(product);
    }
    async findAll() {
        return await this.productRepository.find();
    }
    async findOne(id) {
        const product = await this.productRepository.findOne({
            where: { id },
            select: ['id', 'name', 'description', 'price'],
        });
        if (!product) {
            throw new common_1.NotFoundException(`Post with ID ${id} not found`);
        }
        return product;
    }
    async findAllWithImages() {
        const products = await this.productRepository.find();
        return Promise.all(products.map(async (product) => {
            try {
                const image = await this.galleryService.findOne(product.id);
                return {
                    name: product.name,
                    description: product.description,
                    image: image.url,
                };
            }
            catch {
                return {
                    name: product.name,
                    description: product.description,
                    image: '/images/subscribe.jpg',
                };
            }
        }));
    }
    async update(id, updateProductDto) {
        await this.productRepository.update(id, updateProductDto);
        return this.findOne(id);
    }
    async remove(id) {
        await this.productRepository.delete(id);
    }
    async findPaginated(page, limit) {
        return this.productRepository.findAndCount({
            order: { id: 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
        });
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        gallery_service_1.GalleryService])
], ProductService);
//# sourceMappingURL=product.service.js.map