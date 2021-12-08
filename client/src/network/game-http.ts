import { Http } from './http';
import { Game } from 'src/types';

interface GetGamesReponse {
  games: Game[];
  total: number;
}

class GameHttp extends Http {
  prefix = 'api/games';

  async getGames(start = 0, limit = 10): Promise<GetGamesReponse> {
    const res = await this.get<GetGamesReponse>(`?start=${start}&limit=${limit}`);
    return res.data;
  }
}

export const gameHttp = new GameHttp();
