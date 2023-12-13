import { SelectFavorite } from '@cs/shared';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateFavoriteDto implements Omit<SelectFavorite, 'createdAt'> {
  @ApiProperty()
  @IsNumber()
  userId!: number;

  @IsNumber()
  @ApiProperty()
  videoId!: number;
}
