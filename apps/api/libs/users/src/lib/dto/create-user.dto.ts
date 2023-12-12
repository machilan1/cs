import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ type: String })
  @IsString()
  name!: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsEmail()
  email!: string;

  @ApiProperty({ type: String })
  @IsString()
  password!: string;
}
