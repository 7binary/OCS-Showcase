import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import * as cookieParser from 'cookie-parser';
import { urlencoded, json } from 'express';

import { AppModule } from 'src/app.module';
import { getConfiguration } from './config/configuration';

async function bootstrap() {
  const config = getConfiguration();
  const logger = new Logger('bootstrap');

  try {
    const port = config.server.port || 3000;

    logger.debug(`process.env.NODE_ENV: ${process.env.NODE_ENV}`);
    logger.debug(`config: ${JSON.stringify(config, null, 2)}`);

    // app configuration
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ limit: '50mb', extended: true }));
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }));
    app.enableCors({
      origin: process.env.NODE_ENV === 'production' ? config.server.origin.split(' ') : true,
      credentials: true,
    });

    // swagger configuration
    const swaggerConfig = new DocumentBuilder()
      .setTitle('OCS Showcase')
      .setDescription('API enpoints')
      .setVersion('1.0.0')
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('/swagger', app, document);

    // run app
    await app.listen(port);
    logger.debug(`Application started on port ${port}`);
  } catch (err) {
    logger.error(err.toString(), err.stack);
  }
}

bootstrap();
