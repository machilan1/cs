import { InsertPlaylist } from '@cs/shared';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreatePlaylistDto implements InsertPlaylist {
  @ApiProperty()
  @IsNumber()
  courseId!: number;

  @ApiProperty()
  @IsNumber()
  userId!: number;
}
