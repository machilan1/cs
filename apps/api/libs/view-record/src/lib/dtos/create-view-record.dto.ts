import { SelectViewRecord } from '@cs/shared';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from 'class-validator';

export class CreateViewRecordDto
  implements Omit<SelectViewRecord, 'createdAt' | 'viewRecordId'>
{
  @ApiProperty({ type: Number })
  @IsNumber()
  userId!: number;

  @ApiProperty()
  @IsNumber()
  videoId!: number;

  @ApiProperty()
  @IsString()
  @Length(4)
  videoTimeAnchor!: string;
}
