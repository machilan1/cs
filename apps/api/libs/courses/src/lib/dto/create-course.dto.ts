import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { InsertCategory } from '@cs/shared';
export class CreateCourseDto implements InsertCategory {
  @ApiProperty({ type: String })
  @IsString()
  name!: string;

  @ApiProperty({ type: String })
  @IsString()
  description!: string;

  @ApiProperty()
  @IsNumber()
  teacherId!: number;

  @ApiProperty()
  @IsNumber()
  categoryId!: number;
}
