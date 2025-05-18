import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { StatsService } from '../stats/stats.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CountingInterceptor implements NestInterceptor {
  constructor(private readonly statsService: StatsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const endpoint = this.getPath(request.route?.path || request.url);
    const method = request.method;
    return next.handle().pipe(
      tap(() => {
        this.statsService.incrementRequestCount(method, endpoint);
      }),
    );
  }
  private getPath(path: string): string {
    return path.replace(/\/\d+(\/|$)/g, '/:id$1');
  }
}
