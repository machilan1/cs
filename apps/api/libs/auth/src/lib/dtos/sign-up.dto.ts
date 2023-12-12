import {
  MAX_NAME_LENGTH,
  MAX_PSW_LENGTH,
  MIN_NAME_LENGTH,
  MIN_PSW_LENGTH,
} from '@cs/shared';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class SignUpDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsEmail()
  email!: string;

  @ApiProperty({ type: String })
  @IsString()
  @Length(MIN_PSW_LENGTH, MAX_PSW_LENGTH)
  password!: string;

  @ApiProperty({ type: String })
  @IsString()
  @Length(MIN_NAME_LENGTH, MAX_NAME_LENGTH)
  name!: string;
}
