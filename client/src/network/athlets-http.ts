import { Http } from './http';
import { Athlete } from 'src/types';

class AthleteHttp extends Http {
  prefix = 'api/athletes';

  async getAthlets(): Promise<Athlete[]> {
    const res = await this.get<Athlete[]>();
    return res.data;
  }

  async getAthletById(athlete_id: number): Promise<Athlete> {
    const res = await this.get<Athlete>(`/${athlete_id}`);
    return res.data;
  }
}

export const athleteHttp = new AthleteHttp();
