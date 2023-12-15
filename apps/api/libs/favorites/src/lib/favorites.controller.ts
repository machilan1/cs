import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateFavoriteDto } from './dtos/create-favorite.dto';
import { FavoritesService } from './favorites.service';
import { Favorite } from './entities/favorite.entity';
import { FilterFavorite } from './entities/filter-favorite';
import { JwtGuard } from '@cs/auth';

@ApiTags('favorites')
@UseGuards(JwtGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Post()
  @ApiBody({ type: CreateFavoriteDto })
  @ApiOkResponse({ type: Favorite })
  @ApiOperation({
    summary: 'Add favorite with video id and user id.',
    description: 'Add a video to favorite list for a user',
    operationId: 'addToFavorite',
  })
  async create(@Body() createFavoriteDto: CreateFavoriteDto) {
    const res = await this.favoritesService.create(createFavoriteDto);
    return res[0];
  }

  @Get()
  @ApiOkResponse({ type: [Favorite] })
  @ApiOperation({
    operationId: 'getFavorite',
    summary: 'Retrieve favorites',
  })
  select(@Query() params: FilterFavorite) {
    return this.favoritesService.findAll(params);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Favorite })
  @ApiOperation({
    summary: 'Remove favorite with id',
  })
  async delete(@Param('id', ParseIntPipe) id: number) {
    const res = await this.favoritesService.delete(id);
    return res[0];
  }
}
