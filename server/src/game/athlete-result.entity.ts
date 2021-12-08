import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Athlete } from './athlete.entity';
import { Game } from './game.entity';
import { MedalScore } from './medal-score.enum';

@Entity({ name: 'AthleteResult' })
export class AthleteResult {
  @PrimaryColumn()
  athlete_id: number;

  @PrimaryColumn()
  game_id: number;

  @Column()
  gold: number;

  @Column()
  silver: number;

  @Column()
  bronze: number;

  @JoinColumn({ name: 'athlete_id' })
  @ManyToOne(type => Athlete, athlete => athlete.results)
  athlete: Athlete;

  @JoinColumn({ name: 'game_id' })
  @ManyToOne(type => Game, game => game.results)
  game: Game;

  toJSON() {
    return {
      athlete_id: this.athlete_id,
      game_id: this.game_id,
      gold: this.gold,
      silver: this.silver,
      bronze: this.bronze,
      score: this.score,
      athlete: this.athlete,
      game: this.game,
    };
  }

  get score(): number {
    return this.gold * MedalScore.GOLD
      + this.silver * MedalScore.SILVER
      + this.bronze * MedalScore.BRONZE;
  }
}
