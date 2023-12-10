import {} from '@nestjs/common';

export class LoginDto {
  email!: string;
  password!: string;
}
