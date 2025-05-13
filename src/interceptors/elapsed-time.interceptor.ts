import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ElapsedTimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    return next.handle().pipe(
      map((data) => {
        const elapsedTime = Date.now() - now;

        console.log(
          `Request ${request.method} ${request.url} took ${elapsedTime}ms`,
        );

        if (
          request.path.startsWith('/api/') ||
          request.path.startsWith('/graphql')
        ) {
          response.setHeader('X-Elapsed-Time', `${elapsedTime}ms`);
        }

        if (typeof data === 'object' && !response.headersSent) {
          return { ...data, elapsedTime };
        }

        return data;
      }),
    );
  }
}
