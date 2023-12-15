import { SelectCategory, category } from '@cs/shared';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { eq } from 'drizzle-orm';
import { PG_CONNECTION } from '@cs/shared';
import * as schema from '@cs/shared';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { UpdateCategoryDto } from './dtos/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(PG_CONNECTION) private conn: NodePgDatabase<typeof schema>
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto
  ): Promise<SelectCategory[]> {
    try {
      const res = await this.conn
        .select()
        .from(category)
        .where(eq(category.name, createCategoryDto.name));

      if (res.length > 0) {
        throw 'Group has already existed';
      }

      return this.conn.insert(category).values(createCategoryDto).returning();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async getAll(): Promise<SelectCategory[]> {
    try {
      const res = await this.conn.select().from(category);
      return res;
    } catch {
      throw new BadRequestException('Failed to load categories');
    }
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto
  ): Promise<SelectCategory[]> {
    if (!id || !updateCategoryDto.name) {
      throw new BadRequestException();
    }

    const res = await this.conn
      .update(category)
      .set(updateCategoryDto)
      .where(eq(category.categoryId, id))
      .returning();
    return res;
  }

  async delete(id: number): Promise<SelectCategory[]> {
    const res = await this.conn
      .delete(category)
      .where(eq(category.categoryId, id))
      .returning();
    return res;
  }

  async getCourseByCategoryId(categoryId: number) {
    const res = await this.conn
      .select()
      .from(schema.course)
      .where(eq(schema.course.categoryId, categoryId))
      .leftJoin(schema.user, eq(schema.user.userId, schema.course.teacherId));

    return res
      .map((entry) => ({ ...entry, users: entry.users! }))
      .map((entry) => {
        const { name, userId, email } = entry.users;
        const { teacherId, ...restCourse } = entry.course;
        return { ...restCourse, teacher: { name, userId, email } };
      });
  }
}
