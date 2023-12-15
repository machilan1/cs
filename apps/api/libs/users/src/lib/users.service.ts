/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(PG_CONNECTION) private conn: NodePgDatabase<typeof schema>
  ) {}

  async create(userData: InsertUser): Promise<User> {
    const res = await this.conn.insert(user).values(userData).returning();
    if (!res[0]) {
      throw new BadRequestException('用戶建立失敗');
    }
    return new User(res[0]);
  }

  async findAll(): Promise<User[]> {
    const res = await this.conn.select().from(user);
    return res.map((user) => new User(user));
  }

  async findOne(userId: number): Promise<User | null> {
    const res = await this.conn
      .select()
      .from(user)
      .where(eq(user.userId, userId))
      .limit(1);

    if (!res[0]) {
      return null;
    }
    return new User(res[0]);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const res = await this.conn
      .select()
      .from(user)
      .where(eq(user.email, email))
      .limit(1);

    if (!res[0]) {
      return null;
    }
    return new User(res[0]);
  }

  async findOneByName(name: string): Promise<User | null> {
    const res = await this.conn
      .select()
      .from(user)
      .where(eq(user.name, name))
      .limit(1);

    if (!res[0]) {
      return null;
    }
    return new User(res[0]);
  }

  async update(userId: number, updateUserDto: UpdateUserDto): Promise<User> {
    const res = await this.conn
      .update(user)
      .set(updateUserDto)
      .where(eq(user.userId, userId))
      .returning();
    if (!res[0]) {
      throw new NotFoundException('用戶不存在');
    }
    return new User(res[0]);
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
