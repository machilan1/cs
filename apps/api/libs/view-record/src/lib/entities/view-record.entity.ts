import { SelectViewRecord } from '@cs/shared';
import { ApiProperty } from '@nestjs/swagger';

export class ViewRecord implements SelectViewRecord {
  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  userId!: number;

  @ApiProperty()
  videoId!: number;

  @ApiProperty()
  viewRecordId!: number;

  @ApiProperty()
  videoTimeAnchor!: string;
}
