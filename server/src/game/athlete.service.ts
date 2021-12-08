import { Injectable, NotFoundException } from '@nestjs/common';
import { getRepository } from 'typeorm';

import { Athlete } from './athlete.entity';

@Injectable()
export class AthleteService {

  async listAthletes(): Promise<Athlete[]> {
    const athletes = await getRepository(Athlete).find({
      relations: ['results', 'results.game'],
      order: { athlete_id: 'ASC' },
    });

    return athletes;
  }

  async getAthlete(id: number): Promise<Athlete> {
    const athlete = await getRepository(Athlete).findOne({
      where: { athlete_id: id },
      relations: ['results', 'results.game'],
    });

    if (!athlete) {
      throw new NotFoundException();
    }

    return athlete;
  }
}
