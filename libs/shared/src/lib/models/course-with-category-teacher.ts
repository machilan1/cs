/* tslint:disable */
/* eslint-disable */
import { CourseCategory } from '../models/course-category';
import { CourseTeacher } from '../models/course-teacher';
export interface CourseWithCategoryTeacher {
  category: CourseCategory;
  courseId: number;
  createdAt: string;
  description: string;
  name: string;
  teacher: CourseTeacher;
  thumbnail: string;
}
