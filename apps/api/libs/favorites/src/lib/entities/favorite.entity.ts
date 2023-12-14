import { SelectFavorite } from '@cs/shared';
import { ApiProperty } from '@nestjs/swagger';

export class Favorite implements SelectFavorite {
  @ApiProperty()
  favoriteId!: number;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  userId!: number;

  @ApiProperty()
  videoId!: number;
}
