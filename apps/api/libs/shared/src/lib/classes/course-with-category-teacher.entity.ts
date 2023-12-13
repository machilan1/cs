/* eslint-disable @nx/enforce-module-boundaries */

import { ApiProperty } from '@nestjs/swagger';
import { SelectCategory, SelectCourse } from '@cs/shared';
import { Category } from '@cs/category';
import { CourseTeacher } from '@cs/shared';

export class CourseWithCategoryTeacher
  implements Omit<SelectCourse, 'teacherId' | 'categoryId'>
{
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

  @ApiProperty({ type: Category })
  category!: SelectCategory;

  @ApiProperty()
  thumbnail!: string;
}
