import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty()
  jwt!: string;
}
