/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  InsertUser,
  PG_CONNECTION,
  SelectUser,
  course,
  favorite,
  playlist,
  user,
  video,
  viewRecord,
} from '@cs/shared';
import { and, eq } from 'drizzle-orm';
import { Video } from '@cs/videos';
import { UserCourse } from './entities/user-courses';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@cs/shared';

@Injectable()
export class UsersService {
  constructor(
    @Inject(PG_CONNECTION) private conn: NodePgDatabase<typeof schema>
  ) {}

  async create(userData: InsertUser): Promise<Omit<SelectUser, 'password'>[]> {
    const res = await this.conn.insert(user).values(userData).returning();

    return res.map((user) => {
      const { password, ...rest } = user;
      return rest;
    });
  }

  async findAll(): Promise<Omit<SelectUser, 'password'>[]> {
    const res = await this.conn.select().from(user);

    return res.map((user) => {
      const { password, ...rest } = user;
      return rest;
    });
  }

  async findOne(userId: number): Promise<Omit<SelectUser, 'password'>[]> {
    const res = await this.conn
      .select()
      .from(user)
      .where(eq(user.userId, userId))
      .limit(1);

    return res.map((user) => {
      const { password, ...rest } = user;
      return rest;
    });
  }

  async findOntByEmail(email: string): Promise<Omit<SelectUser, 'password'>[]> {
    const res = await this.conn
      .select()
      .from(user)
      .where(eq(user.email, email))
      .limit(1);

    return res.map((user) => {
      const { password, ...rest } = user;
      return rest;
    });
  }

  async findOntByName(name: string): Promise<Omit<SelectUser, 'password'>[]> {
    const res = await this.conn
      .select()
      .from(user)
      .where(eq(user.name, name))
      .limit(1);

    return res.map((user) => {
      const { password, ...rest } = user;
      return rest;
    });
  }

  async update(
    userId: number,
    updateUserDto: UpdateUserDto
  ): Promise<Omit<SelectUser, 'password'>[]> {
    const res = await this.conn
      .update(user)
      .set(updateUserDto)
      .where(eq(user.userId, userId))
      .returning();
    return res.map((user) => {
      const { password, ...rest } = user;
      return rest;
    });
  }

  async remove(userId: number) {
    const res = await this.conn
      .delete(user)
      .where(eq(user.userId, userId))
      .returning();
    return res.map((user) => {
      const { password, ...rest } = user;
      return rest;
    });
  }

  async getManyByVideoId(videoId: number) {
    const res = await this.conn
      .select()
      .from(viewRecord)
      .where(and(eq(viewRecord.videoId, videoId), eq(user.role, 'student')))
      .leftJoin(user, eq(viewRecord.userId, user.userId));
    return res.map((res) => {
      if (res.users) {
        const { password, ...rest } = res.users;
        return rest;
      } else {
        throw new NotFoundException('用戶資料錯誤');
      }
    });
  }

  async getViewedVideoByUserId(userId: number): Promise<Video[]> {
    const res = await this.conn
      .select()
      .from(viewRecord)
      .leftJoin(video, eq(video.videoId, viewRecord.videoId))
      .where(eq(viewRecord.userId, userId));
    return res.map((entry) => ({ ...entry.video! }));
  }

  async getFavoritesByUserId(userId: number): Promise<Video[]> {
    const res = await this.conn
      .select()
      .from(favorite)
      .where(eq(favorite.userId, userId))
      .leftJoin(video, eq(video.videoId, favorite.videoId));

    return res.map((entry) => ({ ...entry.video! }));
  }

  async getOwnVideoByUserId(userId: number) {
    const res = await this.conn
      .select()
      .from(course)
      .where(eq(course.teacherId, userId))
      .rightJoin(video, eq(course.courseId, video.courseId));
    return res.map((entry) => entry.video);
  }

  async getOwnCoursesByUserId(userId: number): Promise<UserCourse[]> {
    const res = await this.conn
      .select()
      .from(course)
      .where(eq(course.teacherId, userId));
    return res;
  }

  async getPlaylistForUser(userId: number) {
    const res = await this.conn
      .select()
      .from(playlist)
      .where(eq(playlist.userId, userId))
      .rightJoin(course, eq(playlist.courseId, course.courseId));

    return res
      .map((entry) => ({ ...entry, playlist: entry.playlist! }))
      .map((entry) => {
        const { playlist, course } = entry;
        const { courseId, ...rest } = playlist;
        return { ...rest, course };
      });
  }
}
