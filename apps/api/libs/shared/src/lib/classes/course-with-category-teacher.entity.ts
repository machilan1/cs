import { ApiProperty } from '@nestjs/swagger';
import { CourseTeacher } from './course-teacher.entity';
import { CourseCategory } from './course-category';

export class CourseWithCategoryTeacher {
  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  courseId!: number;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  description!: string;

  @ApiProperty({ type: CourseTeacher })
  teacher!: CourseTeacher;

  @ApiProperty({ type: CourseCategory })
  category!: CourseCategory;

  @ApiProperty()
  thumbnail!: string;
}
