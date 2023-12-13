import { SelectCourse } from '@cs/shared';
import { ApiProperty } from '@nestjs/swagger';

export class UserCourse implements SelectCourse {
  @ApiProperty()
  courseId!: number;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  description!: string;

  @ApiProperty()
  thumbnail!: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  teacherId!: number;

  @ApiProperty()
  categoryId!: number;
}
