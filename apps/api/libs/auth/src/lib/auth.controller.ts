import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from '../../dtos/login.dto';
import { AuthService } from './auth.service';
import { SignUpDto } from '../../dtos/sign-up.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
