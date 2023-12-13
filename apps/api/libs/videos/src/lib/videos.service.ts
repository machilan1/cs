import { PG_CONNECTION } from '@cs/shared';
import {
  BadGatewayException,
  BadRequestException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@cs/shared';
import { SelectVideo } from '@cs/shared';
import { eq } from 'drizzle-orm';
import { CreateVideoDto } from './dtos/create-video.dto';
import { UpdateVideoDto } from './dtos/update-video.dto';
import { ApiConflictResponse } from '@nestjs/swagger';

@Injectable()
export class VideosService {
  constructor(
    @Inject(PG_CONNECTION) private conn: NodePgDatabase<typeof schema>
  ) {}

  async create(createVideoDto: CreateVideoDto): Promise<SelectVideo[]> {
    try {
      const res = await this.conn
        .insert(schema.video)
        .values(createVideoDto)
        .returning();
      return res;
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<SelectVideo[]> {
    return this.conn.select().from(schema.video);
  }

  async findOne(videoId: number) {
    return this.conn
      .select()
      .from(schema.video)
      .where(eq(schema.video, videoId));
  }

  async update(
    videoId: number,
    updateVideoDto: UpdateVideoDto
  ): Promise<SelectVideo[]> {
    return this.conn
      .update(schema.video)
      .set(updateVideoDto)
      .where(eq(schema.video.videoId, videoId))
      .returning();
  }

  async delete(videoId: number): Promise<SelectVideo[]> {
    return this.conn
      .delete(schema.video)
      .where(eq(schema.video.videoId, videoId))
      .returning();
  }
}
