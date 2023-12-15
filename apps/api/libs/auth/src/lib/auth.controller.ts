import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/sign-up.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  OmitType,
} from '@nestjs/swagger';
import { LoginResponse } from './models/responses/login.response';
import { JwtGuard } from './guards/jwt.guard';
import { user } from '@cs/shared';
import { ChangeRoleDto } from './dtos/change-role.dto';
import { AuthorizationService } from './authorization.service';
import { User } from '@cs/users';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private authorizationService: AuthorizationService
  ) {}

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

  @Get('me')
  @UseGuards(JwtGuard)
  @ApiOperation({ operationId: 'findMe' })
  @ApiOkResponse()
  async findMe(@Req() req) {
    const { userId } = req['user']['user'];
    return { userId };
  }

  @Post('changeRole')
  @ApiOperation({ operationId: "Change user's role" })
  @ApiOkResponse({ type: OmitType(User, ['password'] as const) })
  async changeRole(@Body() { userId, role }: ChangeRoleDto) {
    const res = await this.authorizationService.setUserRole(userId, role);
    return res[0];
  }
}
