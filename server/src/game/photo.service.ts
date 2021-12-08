import { Readable } from 'stream';
import { Injectable, NotFoundException } from '@nestjs/common';
import { getRepository } from 'typeorm';

import { AthletePhoto } from './athlete-photo.entity';

@Injectable()
export class PhotoService {

  async getPhoto(id: number) {
    const photo = await getRepository(AthletePhoto).findOne({ photo_id: id });

    if (!photo) {
      throw new NotFoundException();
    }

    return photo;
  }

  getReadableStream(buffer: Buffer): Readable {
    const stream = new Readable();

    stream.push(buffer);
    stream.push(null);

    return stream;
  }
}
