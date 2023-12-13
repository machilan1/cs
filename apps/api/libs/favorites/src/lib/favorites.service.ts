import { Inject, Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dtos/create-favorite.dto';
import { PG_CONNECTION } from '@cs/shared';
import * as schema from '@cs/shared';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(PG_CONNECTION) private conn: NodePgDatabase<typeof schema>
  ) {}

  create(createFavoriteDto: CreateFavoriteDto): Promise<Favorite[]> {
    return this.conn
      .insert(schema.favorite)
      .values(createFavoriteDto)
      .returning();
  }
}
