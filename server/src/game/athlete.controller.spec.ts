import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';

describe('AthleteController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/athletes (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/athletes')
      .expect(200);
    const athlete = response.body[0];

    expect(athlete).toHaveProperty('athlete_id');
    expect(athlete).toHaveProperty('name');
    expect(athlete).toHaveProperty('surname');
    expect(athlete).toHaveProperty('full_name');
    expect(athlete).toHaveProperty('photo_url');
  });

  it('/api/athletes/1 (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/athletes/1')
      .expect(200);
    const athlete = response.body;

    expect(athlete).toHaveProperty('athlete_id');
    expect(athlete).toHaveProperty('name');
    expect(athlete).toHaveProperty('surname');
    expect(athlete).toHaveProperty('full_name');
    expect(athlete).toHaveProperty('photo_url');
    expect(athlete).toHaveProperty('bio');
    expect(athlete).toHaveProperty('date_of_birth');
    expect(athlete).toHaveProperty('height');
    expect(athlete).toHaveProperty('weight');
    expect(athlete).toHaveProperty('results');

    const result = athlete.results[0];
    expect(result).toHaveProperty('athlete_id');
    expect(result).toHaveProperty('game_id');
    expect(result).toHaveProperty('gold');
    expect(result).toHaveProperty('silver');
    expect(result).toHaveProperty('bronze');
    expect(result).toHaveProperty('game');

    const game = result.game;
    expect(game).toHaveProperty('game_id');
    expect(game).toHaveProperty('city');
    expect(game).toHaveProperty('year');
  });
});
