import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './supabase/supabase.module';
import { PlayersModule } from './players/players.module';
import { TeamsModule } from './teams/teams.module';
import { VenuesModule } from './venues/venues.module';
import { MatchesModule } from './matches/matches.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SupabaseModule,
    PlayersModule,
    TeamsModule,
    VenuesModule,
    MatchesModule,
    AnalyticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}