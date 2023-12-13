import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateFavoriteDto } from './dtos/create-favorite.dto';
import { FavoritesService } from './favorites.service';
import { Favorite } from './entities/favorite.entity';

@ApiTags('favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @ApiBody({ type: CreateFavoriteDto })
  @ApiOkResponse({ type: Favorite })
  @ApiOperation({
    summary: 'Add favorite with video id and user id.',
    description: 'Add a video to favorite list for a user',
    operationId: 'addToFavorite',
  })
  @Post()
  create(@Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoritesService.create(createFavoriteDto);
  }
}
