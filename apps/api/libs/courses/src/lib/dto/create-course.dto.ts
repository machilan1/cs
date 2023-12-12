import { IsNumber, IsString } from 'class-validator';
import { ApiOperation, ApiProperty } from '@nestjs/swagger';
export class CreateCourseDto {
  @ApiProperty({ type: String })
  @IsString()
  name!: string;

  @ApiProperty({ type: String })
  @IsString()
  description!: string;

  @ApiProperty()
  @IsNumber()
  teacherId!: number;
}
