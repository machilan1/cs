import { Module } from '@nestjs/common';
import { PlaylistService } from './playlists.service';
import { DatabaseModule } from '@cs/shared';
import { PlaylistController } from './playlists.controller';

@Module({
  controllers: [PlaylistController],
  providers: [PlaylistService],
  imports: [DatabaseModule],
  exports: [],
})
export class PlaylistsModule {}
