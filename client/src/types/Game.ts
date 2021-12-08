import { AthleteResult } from './AthleteResult';

export interface Game {
  game_id: number;
  city: string;
  year: number;
  results: AthleteResult[];
}
