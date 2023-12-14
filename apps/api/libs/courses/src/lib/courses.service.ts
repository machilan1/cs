import { Inject, Injectable } from '@nestjs/common';
import { UpdateCourseDto } from '../dto/update-course.dto';
import {
  InsertCourse,
  PG_CONNECTION,
  category,
  course,
  user,
  video,
} from '@cs/shared';
import { eq } from 'drizzle-orm';
import { CourseWithCategoryTeacher } from '@cs/shared';
import { Course } from '../entities/course.entity';
import { FilterCourseParams } from '../dto/fIlter-course.param';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@cs/shared';

@Injectable()
export class CoursesService {
  constructor(
    @Inject(PG_CONNECTION) private conn: NodePgDatabase<typeof schema>
  ) {}

  async create(createCourseDto: InsertCourse): Promise<Course[]> {
    const res = await this.conn
      .insert(course)
      .values(createCourseDto)
      .returning();

    return res;
  }

  async findAll({
    categoryId,
  }: FilterCourseParams): Promise<CourseWithCategoryTeacher[]> {
    const query = this.conn
      .select({
        courseId: course.courseId,
        name: course.name,
        description: course.description,
        createdAt: course.createdAt,
        thumbnail: course.thumbnail,
        teacher: {
          userId: user.userId,
          name: user.name,
          email: user.email,
        },
        category: { categoryId: category.categoryId, name: category.name },
      })
      .from(course)
      .leftJoin(user, eq(course.teacherId, user.userId))
      .leftJoin(category, eq(category.categoryId, course.categoryId))
      .$dynamic();

    if (categoryId) {
      query.where(eq(course.categoryId, categoryId));
    }

    const res = (await query).map((x) => ({
      ...x,
      teacher: x.teacher!,
      category: x.category!,
    }));
    return res;
  }

  async findOne(courseId: number) {
    const res = await this.conn
      .select({
        courseId: course.courseId,
        name: course.name,
        description: course.description,
        createdAt: course.createdAt,
        teacher: { userId: user.userId, name: user.name, email: user.email },
      })
      .from(course)
      .where(eq(course.courseId, courseId))
      .leftJoin(user, eq(course.teacherId, user.userId));

    return res;
  }

  async update(
    courseId: number,
    updateCourseDto: UpdateCourseDto
  ): Promise<Course[]> {
    const res = await this.conn
      .update(course)
      .set({ ...updateCourseDto })
      .where(eq(course.courseId, courseId))
      .returning();
    console.log(res);

    return res;
  }

  async remove(courseId: number): Promise<Course[]> {
    const res = await this.conn
      .delete(course)
      .where(eq(course.courseId, courseId))
      .returning();

    console.log(res);

    return res;
  }

  async getVideosByCourseId(courseId: number) {
    const res = await this.conn
      .select()
      .from(video)
      .where(eq(video.courseId, courseId));

    return res;
  }
}
