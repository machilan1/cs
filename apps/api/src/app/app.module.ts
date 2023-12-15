import { Module, ValidationPipe } from '@nestjs/common';
import { DrizzleService } from '@cs/shared';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '@cs/users';
import { APP_PIPE } from '@nestjs/core';
import { AuthModule } from '@cs/auth';
import { CoursesModule } from '@cs/courses';
import { FileModule } from '@cs/file';
import { join } from 'path';
import { CategoryModule } from '@cs/category';
import { VideosModule } from '@cs/videos';
import { ViewRecordModule } from '@cs/view-record';
import { FavoritesModule } from '@cs/favorites';
import { PlaylistsModule } from '@cs/playlists';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    CategoryModule,
    CoursesModule,
    UsersModule,
    FileModule,
    VideosModule,
    ViewRecordModule,
    FavoritesModule,
    PlaylistsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'upload'),
    }),
  ],
  controllers: [],
  providers: [
    { provide: APP_PIPE, useClass: ValidationPipe },
    { provide: 'drizzle', useClass: DrizzleService },
  ],
  exports: ['drizzle'],
})
export class AppModule {}
