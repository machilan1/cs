/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DrizzleService, InsertUser, SelectUser, user } from '@cs/shared';
import { eq, sql } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(private drizzleService: DrizzleService) {}

  db = this.drizzleService.createDbClient();

  async create(userData: InsertUser): Promise<Omit<SelectUser, 'password'>[]> {
    const res = await this.db.insert(user).values(userData).returning();

    return res.map((user) => {
      const { password, ...rest } = user;
      return rest;
    });
  }

  async findAll(): Promise<Omit<SelectUser, 'password'>[]> {
    const res = await this.db.select().from(user);

    return res.map((user) => {
      const { password, ...rest } = user;
      return rest;
    });
  }

  async findOne(userId: number): Promise<Omit<SelectUser, 'password'>[]> {
    const res = await this.db
      .select()
      .from(user)
      .where(eq(user.userId, userId))
      .limit(1);

    return res.map((user) => {
      const { password, ...rest } = user;
      return rest;
    });
  }

  async findOntByEmail(email: string): Promise<Omit<SelectUser, 'password'>[]> {
    const res = await this.db
      .select()
      .from(user)
      .where(eq(user.email, email))
      .limit(1);

    return res.map((user) => {
      const { password, ...rest } = user;
      return rest;
    });
  }

  async findOntByName(name: string): Promise<Omit<SelectUser, 'password'>[]> {
    const res = await this.db
      .select()
      .from(user)
      .where(eq(user.name, name))
      .limit(1);

    return res.map((user) => {
      const { password, ...rest } = user;
      return rest;
    });
  }

  async update(
    userId: number,
    updateUserDto: UpdateUserDto
  ): Promise<Omit<SelectUser, 'password'>[]> {
    const res = await this.db
      .update(user)
      .set(updateUserDto)
      .where(eq(user.userId, userId))
      .returning();
    return res.map((user) => {
      const { password, ...rest } = user;
      return rest;
    });
  }

  async remove(userId: number) {
    const res = await this.db
      .delete(user)
      .where(eq(user.userId, userId))
      .returning();
    return res.map((user) => {
      const { password, ...rest } = user;
      return rest;
    });
  }
}
