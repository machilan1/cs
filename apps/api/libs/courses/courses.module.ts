import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';

// Todo be careful using this
// @ts-ignore
@Module({
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
