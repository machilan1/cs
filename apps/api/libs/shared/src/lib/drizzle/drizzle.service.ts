import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DrizzleService {
  createDbClient() {
    const conn = process.env['DB_URL'];
    console.log({ conn });
    this.assertConnectionStringIsProvided(conn);
    const queryClient = postgres(
      conn ?? 'postgres://postgres:123456@localhost:5433/db'
    );
    return drizzle(queryClient, { logger: true });
  }

  private assertConnectionStringIsProvided(conn: string | undefined) {
    if (!conn) {
      throw new Error('Conn not provided');
    }
  }
}
