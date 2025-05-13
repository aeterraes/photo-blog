import { SessionRequest } from 'supertokens-node/framework/express';
import { Response, NextFunction } from 'express';
import { getSession } from 'supertokens-node/recipe/session';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthRedirectMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const session = await getSession(req, res, { sessionRequired: false });
      if (session) {
        const accessTokenPayload = session.getAccessTokenPayload();
        res.locals.user = {
          id: accessTokenPayload.id,
          email: accessTokenPayload.email,
        };
      } else {
        res.locals.user = null;
      }
    } catch (error) {
      res.locals.user = null;
    }
    next();
  }
}
