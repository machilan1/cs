import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DrizzleService {
  createDbClient(conn: string) {
    console.log({ conn });
    this.assertConnectionStringIsProvided(conn);
    const queryClient = postgres(
      conn ?? 'postgres://postgres:123456@localhost:5432/db'
    );
    return drizzle(queryClient, { logger: true });
  }

  private assertConnectionStringIsProvided(conn: string) {
    if (!conn) {
      throw new Error('Conn not provided');
    }
  }
}
