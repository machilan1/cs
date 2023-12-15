import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ChangeRoleDto {
  @ApiProperty()
  @IsNumber()
  userId!: number;

  @ApiProperty()
  role!: 'guest' | 'teacher' | 'student';
}
