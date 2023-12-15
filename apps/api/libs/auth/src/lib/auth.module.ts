import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@cs/users';
import { DatabaseModule } from '@cs/shared';
import { AuthorizationService } from './authorization.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService, UsersService, AuthorizationService],
  imports: [DatabaseModule],
})
export class AuthModule {}
