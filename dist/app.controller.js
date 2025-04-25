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
let AppController = class AppController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(req, res) {
        const { access_token } = await this.authService.login(req.user);
        console.log(req.user);
        console.log(access_token);
        res.cookie('access_token', access_token, {
            httpOnly: true,
            maxAge: 3600000,
        });
        console.log(process.env.DATABASE_URL);
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
    getIndex(req) {
        return {
            title: 'home',
            description: 'Photo blog',
            keywords: 'photo, aesthetic',
            isAuthenticated: !!req.user,
            posts: [
                {
                    title: 'Light phenomena',
                    description: 'A collection of photos of halos and unusual distortions',
                    image: '/images/first.jpeg',
                },
                {
                    title: 'Exploring the story of the creation',
                    description: 'An immense ocean, a mysterious atmosphere and a cyber sermon',
                    image: '/images/second.jpg',
                },
                {
                    title: "Autumn's colours",
                    description: 'Autumn exudes golden light',
                    image: '/images/third.jpeg',
                },
                {
                    title: 'Strangeways, here we come',
                    description: 'A strange cast of modern art: what is hidden in it',
                    image: '/images/fourth.jpg',
                },
            ],
            extraJsBody: ['/js/menu-activity.js'],
        };
    }
    getBlog(req) {
        return {
            title: 'blog',
            isAuthenticated: !!req.user,
            posts: [
                {
                    title: 'The colors of autumn are getting brighter',
                    date: 'October 8, 2024',
                    image: '/images/gallery/autumn3.jpg',
                    description: 'How the special atmosphere of the former royal residence changes in autumn: part two',
                },
                {
                    title: 'The colors of autumn are getting brighter',
                    date: 'October 7, 2024',
                    image: '/images/gallery/autumn5.jpg',
                    description: 'How the special atmosphere of the former royal residence changes in autumn: part one',
                },
                {
                    title: 'Light phenomena',
                    date: 'October 6, 2024',
                    image: '/images/first.jpeg',
                    description: 'A collection of photos of halos and unusual distortions',
                },
                {
                    title: 'Exploring the story of the creation',
                    date: 'October 4, 2024',
                    image: '/images/second.jpg',
                    description: 'An immense ocean, a mysterious atmosphere and a cyber sermon',
                },
                {
                    title: "Autumn's colours",
                    date: 'October 1, 2024',
                    image: '/images/third.jpeg',
                    description: 'Autumn exudes golden light',
                },
                {
                    title: 'Strangeways, here we come',
                    date: 'September 29, 2024',
                    image: '/images/fourth.jpg',
                    description: 'A strange cast of modern art: what is hidden in it',
                },
            ],
            extraCss: ['/css/posts-style.css'],
            extraJsBody: ['/js/menu-activity.js'],
        };
    }
    getGallery(req) {
        return {
            title: 'gallery',
            isAuthenticated: !!req.user,
            images: [
                '/images/gallery/autumn1.jpg',
                '/images/gallery/autumn2.jpg',
                '/images/gallery/autumn3.jpg',
                '/images/gallery/autumn4.jpg',
                '/images/gallery/autumn5.jpg',
            ],
            extraCss: ['/css/gallery-style.css'],
            extraJsHead: [
                'https://unpkg.com/swiper/swiper-bundle.min.js',
                '/js/gallery.js',
            ],
            extraJsBody: ['/js/menu-activity.js'],
        };
    }
    getGoods(req) {
        return {
            title: 'goods',
            isAuthenticated: !!req.user,
            goods: [
                {
                    name: 'Autumn Postcard A5',
                    description: 'Description will be soon...',
                    image: '/images/gallery/autumn1.jpg',
                },
                {
                    name: 'Autumn Postcard A5',
                    description: 'Description will be soon...',
                    image: '/images/gallery/autumn2.jpg',
                },
            ],
            extraCss: ['/css/goods-style.css'],
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
    __metadata("design:returntype", void 0)
], AppController.prototype, "getIndex", null);
__decorate([
    (0, common_1.Get)('blog'),
    (0, common_1.Render)('blog-page'),
    __param(0, (0, common_2.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getBlog", null);
__decorate([
    (0, common_1.Get)('gallery'),
    (0, common_1.Render)('gallery-page'),
    __param(0, (0, common_2.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getGallery", null);
__decorate([
    (0, common_1.Get)('goods'),
    (0, common_1.Render)('goods-page'),
    __param(0, (0, common_2.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getGoods", null);
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
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AppController);
//# sourceMappingURL=app.controller.js.map