import { SelectVideo } from '@cs/shared';
import { ApiProperty } from '@nestjs/swagger';

export class Video implements SelectVideo {
  @ApiProperty({ type: Number })
  videoId!: number;

  @ApiProperty({ type: String })
  name!: string;

  @ApiProperty({ type: String })
  fileLink!: string;

  @ApiProperty({ type: String })
  length!: string;

  @ApiProperty({ type: String })
  description!: string;

  @ApiProperty({ type: Date })
  createdAt!: Date;

  @ApiProperty({ type: Number })
  courseId!: number;
}
