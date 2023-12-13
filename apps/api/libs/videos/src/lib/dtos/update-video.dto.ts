import { InsertVideo } from '@cs/shared';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateVideoDto implements Partial<InsertVideo> {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsString()
  length!: string;

  @ApiProperty()
  @IsString()
  description!: string;

  @ApiProperty()
  @IsString()
  fileLink!: string;
}
