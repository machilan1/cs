import { Module, ValidationPipe } from '@nestjs/common';
import { DrizzleService } from '@cs/shared';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '@cs/users';
import { APP_PIPE } from '@nestjs/core';
import { AuthModule } from '@cs/auth';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UsersModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    DrizzleService,
    { provide: APP_PIPE, useClass: ValidationPipe },
  ],
})
export class AppModule {}
