import { Controller, Get, Query } from '@nestjs/common';

import { GameService } from './game.service';
import { Game } from './game.entity';

@Controller('/api/games')
export class GameController {

  constructor(private readonly gameService: GameService) {}

  @Get()
  async listGames(
    @Query('start') start: string,
    @Query('limit') limit: string,
  ): Promise<{games: Game[], total: number}> {
    const { games, total } = await this.gameService.listGames(+start, +limit);

    return { games, total };
  }
}
