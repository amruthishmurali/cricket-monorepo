import { Controller, Get, Post, Query, Param } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('player/:playerId')
  async getPlayerStats(@Param('playerId') playerId: string) {
    return this.analyticsService.getPlayerStats(playerId);
  }

  @Post('predict-match')
  async predictMatch(
    @Query('teamAId') teamAId: string,
    @Query('teamBId') teamBId: string,
  ) {
    return this.analyticsService.predictMatchOutcome(teamAId, teamBId);
  }
}