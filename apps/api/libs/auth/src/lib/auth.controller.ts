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
import { User, UsersService } from '@cs/users';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private authorizationService: AuthorizationService,
    private userService: UsersService,
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
  @ApiOkResponse({ type: User })
  async findMe(@Req() req): Promise<Partial<User>> {
    const { userId } = req['user'];
    return this.userService.findOne(userId);
  }

  @Post('changeRole')
  @ApiOperation({ operationId: "Change user's role" })
  @ApiOkResponse({ type: OmitType(User, ['password'] as const) })
  async changeRole(@Body() { userId, role }: ChangeRoleDto) {
    const res = await this.authorizationService.setUserRole(userId, role);
    return res[0];
  }
}
