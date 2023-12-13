import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../entities/category.entity';
import { SelectCategory, CourseTeacher } from '@cs/shared';

export class CategoryCourse {
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
