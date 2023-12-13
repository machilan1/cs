import { SelectPlaylist } from '@cs/shared';
import { ApiProperty } from '@nestjs/swagger';

export class Playlist implements SelectPlaylist {
  @ApiProperty()
  playlistId!: number;

  @ApiProperty()
  courseId!: number;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  userId!: number;
}
