import { Controller, Get, Param } from '@nestjs/common';
import { AthleteService } from './athlete.service';
import { Athlete } from './athlete.entity';

@Controller('/api/athletes')
export class AthleteController {

  constructor(private readonly athleteService: AthleteService) {}

  @Get()
  async listAthletes(): Promise<Athlete[]> {
    const athletes = await this.athleteService.listAthletes();

    return athletes;
  }

  @Get(':id')
  async getAthlete(@Param('id') id: string): Promise<Athlete> {
    const athlete = await this.athleteService.getAthlete(+id);

    return athlete.toDetailedJSON();
  }
}
