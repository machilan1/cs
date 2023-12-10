import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './models/dtos/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  create(@Body() loginDto: LoginDto) {
    this.authService.login(loginDto);
  }
}
