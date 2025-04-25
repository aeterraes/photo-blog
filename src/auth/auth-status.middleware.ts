import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from './constants';

@Injectable()
export class AuthStatusMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies['access_token'];
    if (token) {
      try {
        const decoded = jwt.verify(token, jwtConstants.secret);
        req.user = decoded;
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        req.user = null;
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      req.user = null;
    }
    next();
  }
}
