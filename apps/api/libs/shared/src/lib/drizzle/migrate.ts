import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

async function main() {
  console.log('Migration Start');
  const pool = new Pool({
    connectionString: 'postgres://postgres:123456@localhost:5432/db',
  });

  const db = drizzle(pool);

  await migrate(db, {
    migrationsFolder:
      'd:/2auto/cs/cs/apps/api/libs/shared/src/lib/drizzle/migrations',
  });

  process.exit(0);
}

main();
console.log('Migration completed');
