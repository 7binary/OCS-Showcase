import { Athlete } from './Athlete';
import { Game } from './Game';

export interface AthleteResult {
  athlete_id: number;
  game_id: number;
  gold: number;
  silver: number;
  bronze: number;
  score: number;
  athlete: Athlete;
  game: Game;
}
