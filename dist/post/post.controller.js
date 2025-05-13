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
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const post_service_1 = require("./post.service");
const create_post_dto_1 = require("./dto/create-post.dto");
const update_post_dto_1 = require("./dto/update-post.dto");
const swagger_1 = require("@nestjs/swagger");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    async getBlog(req) {
        const posts = await this.postService.findAll();
        return {
            title: 'blog',
            posts: posts.map((post) => ({
                id: post.id,
                title: post.title,
                date: post.dateCreated.toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                }),
                image: post.imageUrl,
                description: post.description,
            })),
            extraCss: ['/css/posts-style.css'],
            extraJsBody: ['/js/menu-activity.js'],
        };
    }
    async getPostDetail(id, req) {
        const post = await this.postService.findOne(+id);
        return {
            title: post.title,
            post: {
                ...post,
                date: post.dateCreated.toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                }),
            },
            extraCss: ['/css/posts-style.css'],
            extraJsBody: ['/js/menu-activity.js'],
        };
    }
    addForm(req) {
        return {
            title: 'Add Post',
        };
    }
    async create(createPostDto) {
        await this.postService.create(createPostDto);
    }
    async editForm(id, req) {
        const post = await this.postService.findOne(+id);
        return {
            title: 'Edit Post',
            post,
        };
    }
    async update(id, updatePostDto) {
        await this.postService.update(+id, updatePostDto);
    }
    async remove(id) {
        await this.postService.remove(+id);
    }
};
exports.PostController = PostController;
__decorate([
    (0, common_1.Get)('blog'),
    (0, common_1.Render)('blog-page'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getBlog", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.Render)('post-detail'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPostDetail", null);
__decorate([
    (0, common_1.Get)('add'),
    (0, common_1.Render)('add-post'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "addForm", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.Redirect)('/post/blog'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_dto_1.CreatePostDto]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id/edit'),
    (0, common_1.Render)('edit-post'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "editForm", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.Redirect)('/post/blog'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_post_dto_1.UpdatePostDto]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.Redirect)('/post/blog'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "remove", null);
exports.PostController = PostController = __decorate([
    (0, swagger_1.ApiExcludeController)(),
    (0, common_1.Controller)('post'),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
//# sourceMappingURL=post.controller.js.map