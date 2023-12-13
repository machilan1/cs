import { Module, ValidationPipe } from '@nestjs/common';
import { DrizzleService } from '@cs/shared';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '@cs/users';
import { APP_PIPE } from '@nestjs/core';
import { AuthModule } from '@cs/auth';
import { CoursesModule } from '@cs/courses';
import { FileModule } from '@cs/file';
import { join } from 'path';
import { CategoryModule } from '@cs/category';
import { VideosModule } from '@cs/videos';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
    CoursesModule,
    CategoryModule,
    VideosModule,
    FileModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'upload'),
    }),
  ],
  controllers: [],
  providers: [
    AppService,
    { provide: APP_PIPE, useClass: ValidationPipe },
    { provide: 'drizzle', useClass: DrizzleService },
  ],
  exports: ['drizzle'],
})
export class AppModule {}
