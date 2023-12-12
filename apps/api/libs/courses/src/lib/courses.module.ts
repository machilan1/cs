import { Module } from '@nestjs/common';
import { DrizzleService } from '@cs/shared';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
@Module({
  controllers: [CoursesController],
  providers: [DrizzleService, CoursesService],
  exports: [],
})
export class CoursesModule {}
