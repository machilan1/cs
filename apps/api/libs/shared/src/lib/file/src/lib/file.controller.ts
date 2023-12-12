import {
  UseInterceptors,
  Controller,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer, diskStorage } from 'multer';
import { FileSizeValidationPipe } from './file-validation-pipe/file-validation.pipe';

import { join } from 'path';

@Controller('file')
export class FileController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(__dirname, 'upload'),
        filename: (req, file, cb) => {
          console.log(file.originalname);
          cb(null, file.originalname);
        },
      }),
    })
  )
  async uploadFile(
    @UploadedFile(FileSizeValidationPipe)
    file: Express.Multer.File
  ) {
    if (file instanceof Error) {
      console.log('Happy');

      return file;
    } else {
      console.log(file.path);
      return { path: file.path };
    }
  }
}
