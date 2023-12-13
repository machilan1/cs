import { PG_CONNECTION } from '@cs/shared';
import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@cs/shared';
import { CreatePlaylistDto } from './dtos/create-playlist.dto';
import { Playlist } from './entities/playlist.entity';
import { eq } from 'drizzle-orm';
import { UpdatePlaylistDto } from './dtos/update-playlist.dto';

@Injectable()
export class PlaylistService {
  constructor(
    @Inject(PG_CONNECTION) private conn: NodePgDatabase<typeof schema>
  ) {}

  create(createPlaylistDto: CreatePlaylistDto): Promise<Playlist[]> {
    const res = this.conn
      .insert(schema.playlist)
      .values(createPlaylistDto)
      .returning();
    return res;
  }

  findMany(): Promise<Playlist[]> {
    const res = this.conn.select().from(schema.playlist);
    return res;
  }

  findOne(playlistId: number): Promise<Playlist[]> {
    const res = this.conn
      .select()
      .from(schema.playlist)
      .where(eq(schema.playlist.playlistId, playlistId));
    return res;
  }

  update(
    playlistId: number,
    updatePlaylistDto: UpdatePlaylistDto
  ): Promise<Playlist[]> {
    const res = this.conn
      .update(schema.playlist)
      .set(updatePlaylistDto)
      .where(eq(schema.playlist.playlistId, playlistId))
      .returning();
    return res;
  }

  delete(playlistId: number): Promise<Playlist[]> {
    const res = this.conn
      .delete(schema.playlist)
      .where(eq(schema.playlist.playlistId, playlistId))
      .returning();
    return res;
  }
}
