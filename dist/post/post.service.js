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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const post_entity_1 = require("./entities/post.entity");
const cache_manager_1 = require("@nestjs/cache-manager");
let PostService = class PostService {
    constructor(postRepository, cacheManager) {
        this.postRepository = postRepository;
        this.cacheManager = cacheManager;
    }
    async create(createPostDto) {
        const post = this.postRepository.create(createPostDto);
        return await this.postRepository.save(post);
    }
    async findAll() {
        const cacheKey = 'posts_all';
        const cached = await this.cacheManager.get(cacheKey);
        if (cached)
            return cached;
        const posts = await this.postRepository.find({
            select: ['id', 'title', 'description', 'imageUrl', 'dateCreated'],
        });
        await this.cacheManager.set(cacheKey, posts, 60_000);
        return posts;
    }
    async findOne(id) {
        const cacheKey = `post_${id}`;
        const cached = await this.cacheManager.get(cacheKey);
        if (cached)
            return cached;
        const post = await this.postRepository.findOne({
            where: { id },
            select: ['id', 'title', 'description', 'imageUrl', 'dateCreated'],
        });
        if (!post) {
            throw new common_1.NotFoundException(`Post with ID ${id} not found`);
        }
        await this.cacheManager.set(cacheKey, post, 60_000);
        return post;
    }
    async findRecentPosts(limit) {
        const cacheKey = `posts_recent_${limit}`;
        const cached = await this.cacheManager.get(cacheKey);
        if (cached)
            return cached;
        const posts = await this.postRepository.find({
            order: { dateCreated: 'DESC' },
            take: limit,
            select: ['id', 'title', 'imageUrl', 'dateCreated'],
        });
        await this.cacheManager.set(cacheKey, posts, 60_000);
        return posts;
    }
    async update(id, updatePostDto) {
        await this.postRepository.update(id, updatePostDto);
        await this.cacheManager.del(`post_${id}`);
        await this.cacheManager.del('posts_all');
        await this.cacheManager.del('posts_recent*');
        return this.findOne(id);
    }
    async remove(id) {
        const result = await this.postRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Post with ID ${id} not found`);
        }
        await this.cacheManager.del(`post_${id}`);
        await this.cacheManager.del('posts_all');
        await this.cacheManager.del('posts_recent*');
    }
    async findPaginated(page, limit) {
        const cacheKey = `posts_page_${page}_${limit}`;
        const cached = await this.cacheManager.get(cacheKey);
        if (cached)
            return cached;
        const result = await this.postRepository.findAndCount({
            order: { dateCreated: 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
            select: ['id', 'title', 'imageUrl', 'dateCreated'],
        });
        await this.cacheManager.set(cacheKey, result, 60_000);
        return result;
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object])
], PostService);
//# sourceMappingURL=post.service.js.map