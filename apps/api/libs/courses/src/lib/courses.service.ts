import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from '../../dto/create-course.dto';
import { UpdateCourseDto } from '../../dto/update-course.dto';
import { DrizzleService, InsertCourse, course } from '@cs/shared';
import { eq } from 'drizzle-orm';

@Injectable()
export class CoursesService {
  constructor(private drizzleService: DrizzleService) {}

  db = this.drizzleService.createDbClient();

  create(createCourseDto: InsertCourse) {
    return this.db.insert(course).values(createCourseDto);
  }

  findAll() {
    return this.db.select().from(course);
  }

  findOne(courseId: number) {
    return this.db.select().from(course).where(eq(course.courseId, courseId));
  }

  update(courseId: number, updateCourseDto: UpdateCourseDto) {
    return this.db
      .update(course)
      .set({ ...updateCourseDto })
      .where(eq(course.courseId, courseId));
  }

  remove(courseId: number) {
    return this.db.delete(course).where(eq(course.courseId, courseId));
  }
}
