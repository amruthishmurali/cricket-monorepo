import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../supabase/supabase.module';

@Injectable()
export class PlayersService {
  constructor(
    @Inject(SUPABASE_CLIENT) private readonly supabase: SupabaseClient,
  ) {}

  async findAll() {
    const { data, error } = await this.supabase
      .from('players')
      .select('*')
      .order('name');

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase
      .from('players')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException('Player not found');
    }

    return data;
  }

  async findByName(name: string) {
    const { data, error } = await this.supabase
      .from('players')
      .select('*')
      .ilike('name', `%${name}%`);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}