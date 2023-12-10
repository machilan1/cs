import { Module } from '@nestjs/common';
import { DrizzleService } from '@cs/shared';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@cs/auth';
import { UsersModule } from '@cs/users';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UsersModule],
  controllers: [AppController],
  providers: [AppService, DrizzleService],
})
export class AppModule {}
