import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AnalyticsService {
  private readonly analyticsBaseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.analyticsBaseUrl =
      this.configService.get<string>('ANALYTICS_URL') ||
      'http://localhost:8001';
  }

  async getPlayerStats(playerId: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.analyticsBaseUrl}/stats/player/${playerId}`,
        ),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch player stats from Analytics service',
        500,
      );
    }
  }

  async predictMatchOutcome(teamAId: string, teamBId: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.analyticsBaseUrl}/predictions/match-outcome`,
          null,
          {
            params: {
              team_a_id: teamAId,
              team_b_id: teamBId,
            },
          },
        ),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to get prediction from Analytics service',
        500,
      );
    }
  }
}