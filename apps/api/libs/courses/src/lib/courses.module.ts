import { Module } from '@nestjs/common';
import { DatabaseModule, DrizzleService } from '@cs/shared';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
@Module({
  controllers: [CoursesController],
  providers: [DrizzleService, CoursesService],
  imports: [DatabaseModule],
  exports: [],
})
export class CoursesModule {}
