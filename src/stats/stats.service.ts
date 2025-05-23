import { Injectable } from '@nestjs/common';
import { StatsDto } from './stats.dto';

@Injectable()
export class StatsService {
  private readonly stats: Stat[] = [];

  incrementRequestCount(method: string, path: string): void {
    const existingStat = this.stats.find(
      (s) => s.method === method && s.path === path,
    );

    if (existingStat) {
      existingStat.requestCount++;
    } else {
      this.stats.push({
        method,
        path,
        requestCount: 1,
      });
    }
  }

  getAllStats(): StatsDto[] {
    return this.prettify();
  }

  private prettify(): StatsDto[] {
    return this.stats.map((stat) => ({
      endpoint: `${stat.method} ${stat.path}`,
      requestCount: stat.requestCount,
    }));
  }
}
