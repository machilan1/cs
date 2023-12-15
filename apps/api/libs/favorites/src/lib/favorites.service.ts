import { Inject, Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dtos/create-favorite.dto';
import { PG_CONNECTION } from '@cs/shared';
import * as schema from '@cs/shared';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Favorite } from './entities/favorite.entity';
import { eq } from 'drizzle-orm';
import { FilterFavorite } from './entities/filter-favorite';

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

  async findAll({ userId }: FilterFavorite) {
    const query = this.conn.select().from(schema.favorite).$dynamic();

    if (userId) {
      query.where(eq(schema.favorite.userId, userId));
    }
    const res = await query;
    return res;
  }

  delete(favoriteId: number) {
    return this.conn
      .delete(schema.favorite)
      .where(eq(schema.favorite, favoriteId))
      .returning();
  }
}
