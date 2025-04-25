"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthStatusMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const constants_1 = require("./constants");
let AuthStatusMiddleware = class AuthStatusMiddleware {
    use(req, res, next) {
        const token = req.cookies['access_token'];
        if (token) {
            try {
                const decoded = jwt.verify(token, constants_1.jwtConstants.secret);
                req.user = decoded;
            }
            catch (err) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                req.user = null;
            }
        }
        else {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            req.user = null;
        }
        next();
    }
};
exports.AuthStatusMiddleware = AuthStatusMiddleware;
exports.AuthStatusMiddleware = AuthStatusMiddleware = __decorate([
    (0, common_1.Injectable)()
], AuthStatusMiddleware);
//# sourceMappingURL=auth-status.middleware.js.map