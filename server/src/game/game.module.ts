import { Module } from '@nestjs/common';

import { GameController } from './game.controller';
import { GameService } from './game.service';
import { AthleteController } from './athlete.controller';
import { AthleteService } from './athlete.service';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';

@Module({
  controllers: [GameController, AthleteController, PhotoController],
  providers: [GameService, AthleteService, PhotoService],
})
export class GameModule {}
