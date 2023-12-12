import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DrizzleService } from '@cs/shared';

@Module({
  controllers: [UsersController],
  providers: [DrizzleService, UsersService],
  exports: [],
})
export class UsersModule {}
