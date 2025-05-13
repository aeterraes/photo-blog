"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRedirectMiddleware = void 0;
const session_1 = require("supertokens-node/recipe/session");
const common_1 = require("@nestjs/common");
let AuthRedirectMiddleware = class AuthRedirectMiddleware {
    async use(req, res, next) {
        try {
            const session = await (0, session_1.getSession)(req, res, { sessionRequired: false });
            if (session) {
                const accessTokenPayload = session.getAccessTokenPayload();
                res.locals.user = {
                    id: accessTokenPayload.id,
                    email: accessTokenPayload.email,
                };
            }
            else {
                res.locals.user = null;
            }
        }
        catch (error) {
            res.locals.user = null;
        }
        next();
    }
};
exports.AuthRedirectMiddleware = AuthRedirectMiddleware;
exports.AuthRedirectMiddleware = AuthRedirectMiddleware = __decorate([
    (0, common_1.Injectable)()
], AuthRedirectMiddleware);
//# sourceMappingURL=auth-status.middleware.js.map