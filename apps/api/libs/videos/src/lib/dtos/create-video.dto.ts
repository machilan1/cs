import { InsertVideo } from '@cs/shared';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateVideoDto implements Partial<InsertVideo> {
  @ApiProperty({ type: String })
  @IsString()
  fileLink!: string;

  @ApiProperty({ type: String })
  @IsString()
  name!: string;

  @ApiProperty({ type: String })
  @IsString()
  length!: string;

  @ApiProperty({ type: String })
  @IsString()
  description!: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  courseId!: number;
}
