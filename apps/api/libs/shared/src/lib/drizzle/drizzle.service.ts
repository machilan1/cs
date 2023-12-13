import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { Injectable } from '@nestjs/common';
import * as schema from './schema';

@Injectable()
export class DrizzleService {
  db!: PostgresJsDatabase<typeof schema>;

  createDbClient() {
    if (this.db) {
      return this.db;
    }

    const conn = process.env['DB_URL'];
    console.log({ conn });
    this.assertConnectionStringIsProvided(conn);
    const queryClient = postgres(
      conn ?? 'postgres://postgres:123456@localhost:5433/db'
    );
    return drizzle(queryClient, { logger: true, schema });
  }

  private assertConnectionStringIsProvided(conn: string | undefined) {
    if (!conn) {
      throw new Error('Conn not provided');
    }
  }
}
