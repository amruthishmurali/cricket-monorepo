import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../supabase/supabase.module';

@Injectable()
export class MatchesService {
  constructor(
    @Inject(SUPABASE_CLIENT) private readonly supabase: SupabaseClient,
  ) {}

  async findAll() {
    const { data, error } = await this.supabase
      .from('matches')
      .select(`
        *,
        team_a:teams!matches_team_a_id_fkey(*),
        team_b:teams!matches_team_b_id_fkey(*),
        venue:venues(*)
      `)
      .order('start_time', { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase
      .from('matches')
      .select(`
        *,
        team_a:teams!matches_team_a_id_fkey(*),
        team_b:teams!matches_team_b_id_fkey(*),
        venue:venues(*),
        winner:teams!matches_winner_team_id_fkey(*)
      `)
      .eq('id', id)
      .single();

    if (error || !data) throw new NotFoundException('Match not found');
    return data;
  }

  async findByStatus(status: string) {
    const { data, error } = await this.supabase
      .from('matches')
      .select(`
        *,
        team_a:teams!matches_team_a_id_fkey(*),
        team_b:teams!matches_team_b_id_fkey(*),
        venue:venues(*)
      `)
      .eq('status', status)
      .order('start_time');

    if (error) throw new Error(error.message);
    return data;
  }
}