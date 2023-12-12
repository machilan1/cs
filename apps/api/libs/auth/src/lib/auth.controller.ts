import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/sign-up.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LoginResponse } from './models/responses/login.response';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ operationId: 'register' })
  @ApiCreatedResponse({ description: 'Registered' })
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('login')
  @ApiOperation({ operationId: 'login' })
  @ApiOkResponse({ type: LoginResponse })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
