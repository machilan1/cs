import { PG_CONNECTION } from '@cs/shared';
import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@cs/shared';
import { SelectVideo } from '@cs/shared';
import { eq } from 'drizzle-orm';
import { CreateVideoDto } from './dtos/create-video.dto';
import { UpdateVideoDto } from './dtos/update-video.dto';

@Injectable()
export class VideosService {
  constructor(
    @Inject(PG_CONNECTION) private conn: NodePgDatabase<typeof schema>
  ) {}

  async create(createVideoDto: CreateVideoDto): Promise<SelectVideo[]> {
    const res = await this.conn
      .insert(schema.video)
      .values(createVideoDto)
      .returning();
    return res;
  }

  async findAll(): Promise<SelectVideo[]> {
    const res = await this.conn.select().from(schema.video);
    return res;
  }

  async findOne(videoId: number) {
    const res = await this.conn
      .select()
      .from(schema.video)
      .where(eq(schema.video, videoId));
    return res;
  }

  async update(
    videoId: number,
    updateVideoDto: UpdateVideoDto
  ): Promise<SelectVideo[]> {
    const res = await this.conn
      .update(schema.video)
      .set(updateVideoDto)
      .where(eq(schema.video.videoId, videoId))
      .returning();
    return res;
  }

  async delete(videoId: number): Promise<SelectVideo[]> {
    const res = await this.conn
      .delete(schema.video)
      .where(eq(schema.video.videoId, videoId))
      .returning();
    return res;
  }
}
