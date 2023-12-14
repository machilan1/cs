import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class FilterVideoParams {
  @ApiProperty({
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => +value)
  courseId?: number;
}
