import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './models/dtos/login.dto';
import { AuthService } from './auth.service';
import { SignUpDto } from './models/dtos/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async signUp(@Body() signUpDto: SignUpDto) {
    try {
      return this.authService.signUp(signUpDto);
    } catch (err) {
      return err;
    }
  }
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      return this.authService.login(loginDto);
    } catch (err) {
      return err;
    }
  }
}
