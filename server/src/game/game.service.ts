import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';

import { Game } from './game.entity';

@Injectable()
export class GameService {

  async listGames(start?: number, limit?: number): Promise<{games: Game[], total: number}> {
    if (!start || start < 0) {
      start = 0;
    }
    if (!limit || limit < 0 || limit > 100) {
      limit = 100;
    }

    const [games, total] = await getRepository(Game).createQueryBuilder('game')
      .leftJoinAndSelect('game.results', 'results')
      .leftJoinAndSelect('results.athlete', 'athlete')
      .skip(start)
      .take(limit)
      .orderBy({ 'game.year': 'DESC' })
      .getManyAndCount();

    return { games, total };
  }
}
