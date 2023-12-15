import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { DatabaseModule } from '@cs/shared';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, JwtService],
  exports: [],
  imports: [DatabaseModule],
})
export class FavoritesModule {}
