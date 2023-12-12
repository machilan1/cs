/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DrizzleService, InsertUser, SelectUser, user } from '@cs/shared';
import { eq, sql } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(private drizzleService: DrizzleService) {}

  db = this.drizzleService.createDbClient();

  create(userData: InsertUser) {
    return this.db.insert(user).values(userData);
  }

  async findAll(): Promise<SelectUser[]> {
    return this.db
      .select({
        name: user.name,
        userId: user.userId,
        role: user.role,
        email: user.email,
        createdAt: user.createdAt,
      })
      .from(user);
  }

  async findOne(userId: number): Promise<SelectUser> {
    const [res] = await this.db
      .select({
        name: user.name,
        userId: user.userId,
        role: user.role,
        email: user.email,
        createdAt: user.createdAt,
      })
      .from(user)
      .where(eq(user.userId, userId))
      .limit(1);

    return res;
  }

  async findOntByEmail(email: string): Promise<SelectUser> {
    const [res] = await this.db
      .select({
        name: user.name,
        userId: user.userId,
        role: user.role,
        email: user.email,
        createdAt: user.createdAt,
      })
      .from(user)
      .where(eq(user.email, email))
      .limit(1);

    return res;
  }
  async findOntByName(name: string): Promise<SelectUser> {
    const [res] = await this.db
      .select({
        name: user.name,
        userId: user.userId,
        role: user.role,
        email: user.email,
        createdAt: user.createdAt,
      })
      .from(user)
      .where(eq(user.name, name))
      .limit(1);

    return res;
  }

  // Todo uncomment this later
  update(userId: number, updateUserDto: UpdateUserDto) {
    return this.db
      .update(user)
      .set(updateUserDto)
      .where(eq(user.userId, userId));
  }

  remove(userId: number) {
    return this.db.delete(user).where(eq(user.userId, userId));
  }
}
