import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { createHash } from 'crypto';

@Injectable()
export class EtagInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    return next.handle().pipe(
      map((data) => {
        if (!data || response.statusCode === HttpStatus.NO_CONTENT) {
          return data;
        }
        const etag = createHash('sha256')
          .update(JSON.stringify(data))
          .digest('hex');
        response.setHeader('ETag', etag);
        response.setHeader('Cache-Control', 'public, max-age=3600');

        const ifNoneMatch = request.headers['if-none-match'];
        if (ifNoneMatch && ifNoneMatch === etag) {
          response.status(HttpStatus.NOT_MODIFIED);
          return null;
        }
        return data;
      }),
    );
  }
}
