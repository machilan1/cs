import { Inject, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DrizzleService } from '@cs/shared';

@Module({
  controllers: [UsersController],
  providers: [UsersService, DrizzleService],
  exports: [],
})
export class UsersModule {}
