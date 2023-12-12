import { SelectCourse } from '@cs/shared';
export class UpdateCourseResponse implements SelectCourse {
  courseId!: number;
  name!: string;
  description!: string;
  createdAt!: Date;
  teacherId!: number;
}
