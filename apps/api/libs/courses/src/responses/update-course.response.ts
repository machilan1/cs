import { SelectCourse } from '@cs/shared';
export class UpdateCourseResponse implements SelectCourse {
  thumbnail!: string;
  categoryId!: number;
  courseId!: number;
  name!: string;
  description!: string;
  createdAt!: Date;
  teacherId!: number;
}
