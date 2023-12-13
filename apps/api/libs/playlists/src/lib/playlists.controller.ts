import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePlaylistDto } from './dtos/create-playlist.dto';
import { PlaylistService } from './playlists.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Playlist } from './entities/playlist.entity';
import { UpdatePlaylistDto } from './dtos/update-playlist.dto';

@ApiTags('playlists')
@Controller('playlists')
export class PlaylistController {
  constructor(private playlistService: PlaylistService) {}

  @Post()
  @ApiOperation({ operationId: 'createPlaylist' })
  @ApiResponse({ type: [Playlist] })
  @ApiBody({ type: CreatePlaylistDto })
  create(@Body() createPlaylist: CreatePlaylistDto) {
    return this.playlistService.create(createPlaylist);
  }

  @Get()
  @ApiOperation({ operationId: 'findPlaylists' })
  @ApiResponse({ type: [Playlist] })
  findMany() {
    return this.playlistService.findMany();
  }

  @Get(':id')
  @ApiOperation({ operationId: 'findOnePlaylist' })
  @ApiResponse({ type: [Playlist] })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.playlistService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ operationId: 'updatePlaylist' })
  @ApiResponse({ type: [Playlist] })
  @ApiBody({ type: UpdatePlaylistDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePlayDto: UpdatePlaylistDto
  ) {
    return this.playlistService.update(id, updatePlayDto);
  }

  @Delete(':id')
  @ApiOperation({ operationId: 'deletePlaylist' })
  @ApiResponse({ type: [Playlist] })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.playlistService.delete(id);
  }
}
