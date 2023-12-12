import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { DrizzleService } from '@cs/shared';
import { UsersService } from '@cs/users';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService, DrizzleService, UsersService],
})
export class AuthModule {}
