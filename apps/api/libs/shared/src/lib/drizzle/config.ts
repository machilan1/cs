import type { Config } from 'drizzle-kit';
export default {
  schema: process.env['SCHEMA_FILE_DIR'],
  out: process.env['MIGRATION_FILE_DIR'],
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env['DB_URL'] ?? '',
  },
} satisfies Config;
