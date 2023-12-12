import { Module } from '@nestjs/common';
import { FileController } from './file.controller';

@Module({
  controllers: [FileController],
  providers: [],
  exports: [],
})
export class FileModule {}
