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
const common_2 = require("@nestjs/common");
const local_auth_guard_1 = require("./auth/local-auth.guard");
const jwt_auth_guard_1 = require("./auth/jwt-auth.guard");
const auth_service_1 = require("./auth/auth.service");
const post_service_1 = require("./post/post.service");
let AppController = class AppController {
    constructor(authService, postService) {
        this.authService = authService;
        this.postService = postService;
    }
    async login(req, res) {
        const { access_token } = await this.authService.login(req.user);
        console.log(req.user);
        console.log(access_token);
        res.cookie('access_token', access_token, {
            httpOnly: true,
            maxAge: 3600000,
        });
        return res.redirect('/profile');
    }
    getLogin(res) {
        return {
            title: 'Login',
            description: 'Login',
            extraJsBody: ['/js/menu-activity.js'],
        };
    }
    getProfile(req) {
        return {
            title: 'Profile',
            description: 'User profile page',
            keywords: 'user, profile',
            isAuthenticated: !!req.user,
            user: req.user,
            extraJsBody: ['/js/menu-activity.js'],
        };
    }
    logout(res) {
        res.clearCookie('access_token');
        return res.redirect('/home');
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
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('auth/login'),
    __param(0, (0, common_2.Request)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('auth/login'),
    (0, common_1.Render)('login'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getLogin", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('profile'),
    (0, common_1.Render)('profile'),
    __param(0, (0, common_2.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)('auth/logout'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('home'),
    (0, common_1.Render)('index'),
    __param(0, (0, common_2.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getIndex", null);
__decorate([
    (0, common_1.Get)('table'),
    (0, common_1.Render)('table-form'),
    __param(0, (0, common_2.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getTableForm", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        post_service_1.PostService])
], AppController);
//# sourceMappingURL=app.controller.js.map