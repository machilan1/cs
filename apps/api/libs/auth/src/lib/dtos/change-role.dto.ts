import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class ChangeRoleDto {
  @ApiProperty()
  @IsNumber()
  userId!: number;

  @ApiProperty()
  role!: 'guest' | 'teacher' | 'student';
}
