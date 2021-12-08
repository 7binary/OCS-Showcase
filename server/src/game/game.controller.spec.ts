import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';

describe('GameController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/games (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/games')
      .expect(200);
    const game = response.body?.games[0];

    expect(response.body).toHaveProperty('games');
    expect(response.body).toHaveProperty('total');
    expect(game).toHaveProperty('game_id');
    expect(game).toHaveProperty('city');
    expect(game).toHaveProperty('year');
    expect(game).toHaveProperty('results');

    const gamesWithResults = response.body?.games.filter(game => game.results.length > 0);
    expect(gamesWithResults.length).toBeGreaterThan(0);

    const result = gamesWithResults[0].results[0];
    expect(result).toHaveProperty('athlete_id');
    expect(result).toHaveProperty('game_id');
    expect(result).toHaveProperty('gold');
    expect(result).toHaveProperty('silver');
    expect(result).toHaveProperty('bronze');
    expect(result).toHaveProperty('athlete');

    const athlete = result.athlete;
    expect(athlete).toHaveProperty('athlete_id');
    expect(athlete).toHaveProperty('name');
    expect(athlete).toHaveProperty('surname');
    expect(athlete).toHaveProperty('full_name');
    expect(athlete).toHaveProperty('photo_url');
  });
});
