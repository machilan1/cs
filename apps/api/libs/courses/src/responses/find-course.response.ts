export class FindCourseResponse {
  courseId!: number;
  name!: string;
  description!: string;
  createdAt!: Date;
  teacherId!: number;
  teacher!: { name: string; email: string };
}
