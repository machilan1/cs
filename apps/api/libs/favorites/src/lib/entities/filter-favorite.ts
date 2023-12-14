import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class FilterFavorite {
  @ApiProperty({
    nullable: true,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => +value)
  userId?: number;
}
