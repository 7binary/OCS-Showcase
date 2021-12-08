import { AthleteResult } from './AthleteResult';

export interface Athlete {
  athlete_id: number;
  name: string;
  surname: string;
  full_name: string;
  photo_url: string | null;
  bio?: string | null;
  date_of_birth? : string | null;
  height? : number | null;
  weight? : number | null;
  results?: AthleteResult[];
}
