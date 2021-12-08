import { Entity, Column, PrimaryGeneratedColumn, OneToMany, AfterLoad } from 'typeorm';
import { AthleteResult } from './athlete-result.entity';

@Entity({ name: 'Game' })
export class Game {
  @PrimaryGeneratedColumn()
  game_id: number;

  @Column()
  city: string;

  @Column()
  year: number;

  @OneToMany(type => AthleteResult, result => result.game, { onDelete: 'CASCADE' })
  results: AthleteResult[];

  @AfterLoad()
  sortAttributes() {
    if (this?.results?.length) {
      this.results.sort((a, b) => a.score - b.score);
    }
  }
}
