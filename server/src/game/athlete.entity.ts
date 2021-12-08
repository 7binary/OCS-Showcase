import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
  AfterLoad,
} from 'typeorm';
import { AthletePhoto } from './athlete-photo.entity';
import { AthleteResult } from './athlete-result.entity';
import { getConfiguration } from 'src/config/configuration';

@Entity({ name: 'Athlete' })
export class Athlete {
  @PrimaryGeneratedColumn()
  athlete_id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  bio: string;

  @Column()
  date_of_birth: string;

  @Column()
  weight: number;

  @Column()
  height: number;

  @Column()
  photo_id: number;

  @OneToMany(type => AthleteResult, result => result.athlete, { onDelete: 'CASCADE' })
  results: AthleteResult[];

  @OneToOne(type => AthletePhoto, { primary: true, cascade: true })
  @JoinColumn({ name: 'photo_id' })
  photo: AthletePhoto;

  @AfterLoad()
  sortAttributes() {
    if (this?.results?.length) {
      this.results.sort((a, b) => a.game_id - b.game_id);
    }
  }

  toJSON() {
    return {
      athlete_id: this.athlete_id,
      name: this.name,
      surname: this.surname,
      full_name: this.full_name,
      photo_url: this.photo_url,
    };
  }

  toDetailedJSON() {
    return {
      athlete_id: this.athlete_id,
      name: this.name,
      surname: this.surname,
      full_name: this.full_name,
      photo_url: this.photo_url,
      bio: this.bio,
      date_of_birth: this.date_of_birth,
      weight: this.weight,
      height: this.height,
      results: this.results,
    } as Athlete;
  }

  get full_name() {
    return `${this.name} ${this.surname}`;
  }

  get photo_url() {
    return this.photo_id
      ? `${getConfiguration().server.url}/api/photos/${this.photo_id}`
      : null;
  }
}
