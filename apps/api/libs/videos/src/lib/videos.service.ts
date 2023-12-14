import { PG_CONNECTION } from '@cs/shared';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@cs/shared';
import { SelectVideo } from '@cs/shared';
import { and, eq } from 'drizzle-orm';
import { CreateVideoDto } from './dtos/create-video.dto';
import { UpdateVideoDto } from './dtos/update-video.dto';
import { FilterVideoParams } from './entities/filter-video-params';

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

  async findAll({ courseId }: FilterVideoParams): Promise<SelectVideo[]> {
    const query = this.conn.select().from(schema.video).$dynamic();

    if (courseId) {
      query.where(eq(schema.video.courseId, courseId));
    }

    const res = await query;
    return res;
  }

  async findOne(videoId: number) {
    return this.conn
      .select()
      .from(schema.video)
      .where(eq(schema.video.videoId, videoId));
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

  async findFavoritesByUserId(userId: number) {
    const res = await this.conn
      .select()
      .from(schema.favorite)
      .where(eq(schema.favorite.userId, userId))
      .leftJoin(
        schema.video,
        eq(schema.favorite.videoId, schema.video.videoId)
      );
    return res.map((x) => ({
      ...x,
      video: x.video!,
    }));
  }

  async getStudentsByVideoId(videoId: number) {
    const res = await this.conn
      .select()
      .from(schema.viewRecord)
      .where(
        and(
          eq(schema.viewRecord.videoId, videoId),
          eq(schema.user.role, 'student')
        )
      )
      .rightJoin(schema.user, eq(schema.viewRecord.userId, schema.user.userId));

    return res.map((entry) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = entry.users;
      return rest;
    });
  }
}
