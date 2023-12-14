import { SelectCategory } from '../drizzle/schema';

export class CourseCategory implements SelectCategory {
  categoryId!: number;
  name!: string;
}
