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

  @ApiProperty({ type: Number })
  @IsNumber()
  teacherId!: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  categoryId!: number;

  @ApiProperty({ type: Number })
  @IsString()
  thumbnail!: string;
}
