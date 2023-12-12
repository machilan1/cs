import { Injectable } from '@nestjs/common';
import { UpdateCourseDto } from './dto/update-course.dto';
import {
  DrizzleService,
  InsertCourse,
  SelectCourse,
  course,
  user,
} from '@cs/shared';
import { eq } from 'drizzle-orm';
import { CourseEntity } from './entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(private drizzleService: DrizzleService) {}

  db = this.drizzleService.createDbClient();

  async create(createCourseDto: InsertCourse): Promise<SelectCourse[]> {
    const res = await this.db
      .insert(course)
      .values(createCourseDto)
      .returning();

    return res;
  }

  async findAll(): Promise<CourseEntity[]> {
    const res = await this.db
      .select({
        courseId: course.courseId,
        name: course.name,
        description: course.description,
        createdAt: course.createdAt,
        teacher: { userId: user.userId, name: user.name, email: user.email },
      })
      .from(course)
      .leftJoin(user, eq(course.teacherId, user.userId));

    return res.map(
      (course) => new CourseEntity({ ...course, teacher: course.teacher! })
    );
  }

  async findOne(courseId: number) {
    const res = await this.db
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

    return res.map(
      (course) => new CourseEntity({ ...course, teacher: course.teacher! })
    );
  }

  async update(
    courseId: number,
    updateCourseDto: UpdateCourseDto
  ): Promise<SelectCourse[]> {
    const res = await this.db
      .update(course)
      .set({ ...updateCourseDto })
      .where(eq(course.courseId, courseId))
      .returning();
    console.log(res);

    return res;
  }

  async remove(courseId: number): Promise<SelectCourse[]> {
    const res = await this.db
      .delete(course)
      .where(eq(course.courseId, courseId))
      .returning();

    console.log(res);

    return res;
  }
}
