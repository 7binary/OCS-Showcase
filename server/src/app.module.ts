import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GameModule } from './game/game.module';
import { getConfiguration }  from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [getConfiguration],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database:  getConfiguration().database.path,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    GameModule,
  ],
})
export class AppModule {}
