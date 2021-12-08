import { Res, Controller, Get, Param } from '@nestjs/common';
import { Response } from 'express';

import { PhotoService } from './photo.service';

@Controller('/api/photos')
export class PhotoController {

  constructor(private readonly photoService: PhotoService) {}

  @Get(':id')
  async getPhoto(
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    const photo = await this.photoService.getPhoto(+id);
    const buffer = photo.photo;
    const stream = this.photoService.getReadableStream(buffer);

    res.set({
      'Content-Type': photo.mime_type,
      'Content-Length': buffer.length,
    });

    stream.pipe(res);
  }
}
