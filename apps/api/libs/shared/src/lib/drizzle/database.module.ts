import { Module } from '@nestjs/common';
import { PG_CONNECTION } from './token';
import postgres from 'postgres';
import * as schema from './schema';
import { drizzle } from 'drizzle-orm/postgres-js';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    {
      provide: PG_CONNECTION,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const conn = configService.get('DB_URL');
        if (!conn) {
          throw new Error('Conn not provided');
        }
        const queryClient = postgres(conn);
        return drizzle(queryClient, { logger: true, schema });
      },
    },
  ],
  exports: [PG_CONNECTION],
})
export class DatabaseModule {}
