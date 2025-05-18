import { Controller, Get, Render } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get()
  @Render('stats')
  getStatsPage() {
    const stats = this.statsService.getAllStats();
    return { stats };
  }
}
