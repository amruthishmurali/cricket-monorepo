import { Controller, Get, Param, Query } from '@nestjs/common';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  findAll() {
    return this.playersService.findAll();
  }

  @Get('search')
  search(@Query('q') query: string) {
    return this.playersService.findByName(query || '');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playersService.findOne(id);
  }
}