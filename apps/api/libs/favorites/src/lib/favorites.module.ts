import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { DatabaseModule } from '@cs/shared';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [],
  imports: [DatabaseModule],
})
export class FavoritesModule {}
