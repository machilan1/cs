import { SelectCategory } from '@cs/shared';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryEntity implements SelectCategory {
  @ApiProperty({ type: Number })
  categoryId!: number;

  @ApiProperty({ type: String })
  name!: string;
}
