import { PG_CONNECTION } from '@cs/shared';
import { Inject, Injectable } from '@nestjs/common';
import * as schema from '@cs/shared';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';

@Injectable()
export class AuthorizationService {
  constructor(
    @Inject(PG_CONNECTION) private conn: NodePgDatabase<typeof schema>
  ) {}

  async setUserRole(userId: number, role: 'guest' | 'student' | 'teacher') {
    const res = await this.conn
      .update(schema.user)
      .set({ role })
      .where(eq(schema.user.userId, userId))
      .returning();
    return res;
  }
}
