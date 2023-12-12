/* eslint-disable @nx/enforce-module-boundaries */
import { SelectCourse } from '../../shared/src/lib/drizzle/schema';
import { ApiProperty } from '@nestjs/swagger';

export class Course implements SelectCourse {
  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  courseId!: number;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  description!: string;

  @ApiProperty()
  teacherId!: number;
}
