import { SelectCategory } from '@cs/shared';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class Category implements SelectCategory {
  @ApiProperty({ type: Number })
  @IsNumber()
  categoryId!: number;

  @ApiProperty({ type: String })
  @IsString()
  name!: string;
}
