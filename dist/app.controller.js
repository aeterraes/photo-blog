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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const post_service_1 = require("./post/post.service");
const user_service_1 = require("./user/user.service");
const session_1 = require("supertokens-node/recipe/session");
const emailpassword_1 = require("supertokens-node/recipe/emailpassword");
const supertokens_node_1 = require("supertokens-node");
let AppController = class AppController {
    constructor(postService, userService) {
        this.postService = postService;
        this.userService = userService;
    }
    async login(body, res, req) {
        try {
            const { email, password } = body;
            const user = await this.userService.findOneByEmail(email);
            if (!user) {
                return res.status(common_1.HttpStatus.UNAUTHORIZED);
            }
            const response = await emailpassword_1.default.signIn('', email, password);
            if (response.status === 'WRONG_CREDENTIALS_ERROR') {
                return res.status(common_1.HttpStatus.UNAUTHORIZED);
            }
            const recipeUserId = supertokens_node_1.default.convertToRecipeUserId(response.user.id);
            await session_1.default.createNewSession(req, res, '', recipeUserId, { id: user.id, email: user.email }, { userData: { id: user.id, email: user.email } }, {});
            return res.redirect('/profile');
        }
        catch (error) {
            console.error('err:', error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    getLogin() {
        return {};
    }
    async logout(req, res) {
        try {
            const session = await (0, session_1.getSession)(req, res);
            await session.revokeSession();
            return res.status(200);
        }
        catch (err) { }
    }
    async getProfile(req, res) {
        try {
            const session = await (0, session_1.getSession)(req, res);
            const accessTokenPayload = session.getAccessTokenPayload();
            const user = await this.userService.findOneByEmail(accessTokenPayload.email);
            return { user };
        }
        catch (error) {
            console.error('err', error);
            return res.status(401);
        }
    }
    async getIndex(req) {
        const recentPosts = await this.postService.findRecentPosts(4);
        return {
            title: 'home',
            description: 'Photo blog',
            keywords: 'photo, aesthetic',
            isAuthenticated: !!req.user,
            posts: recentPosts.map((post) => ({
                id: post.id,
                title: post.title,
                description: post.description,
                image: post.imageUrl,
            })),
            extraJsBody: ['/js/menu-activity.js'],
        };
    }
    getTableForm(req) {
        return {
            title: 'table-form',
            isAuthenticated: !!req.user,
            extraCss: ['/css/table-style.css'],
            extraJsBody: ['/js/menu-activity.js', '/js/table.js'],
        };
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('login'),
    (0, common_1.Render)('login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getLogin", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.Render)('profile'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)('index'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getIndex", null);
__decorate([
    (0, common_1.Get)('table'),
    (0, common_1.Render)('table-form'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getTableForm", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [post_service_1.PostService,
        user_service_1.UserService])
], AppController);
//# sourceMappingURL=app.controller.js.map