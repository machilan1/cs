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
  @ApiResponse({ type: Playlist })
  @ApiBody({ type: CreatePlaylistDto })
  async create(@Body() createPlaylist: CreatePlaylistDto) {
    const res = await this.playlistService.create(createPlaylist);
    return res[0];
  }

  @Get()
  @ApiOperation({ operationId: 'findPlaylists' })
  @ApiResponse({ type: [Playlist] })
  findMany() {
    return this.playlistService.findMany();
  }

  @Get(':id')
  @ApiOperation({ operationId: 'findOnePlaylist' })
  @ApiResponse({ type: Playlist })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const res = await this.playlistService.findOne(id);
    return res[0];
  }

  @Patch(':id')
  @ApiOperation({ operationId: 'updatePlaylist' })
  @ApiResponse({ type: Playlist })
  @ApiBody({ type: UpdatePlaylistDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePlayDto: UpdatePlaylistDto
  ) {
    const res = await this.playlistService.update(id, updatePlayDto);
    return res[0];
  }

  @Delete(':id')
  @ApiOperation({ operationId: 'deletePlaylist' })
  @ApiResponse({ type: Playlist })
  async delete(@Param('id', ParseIntPipe) id: number) {
    const res = await this.playlistService.delete(id);
    return res[0];
  }
}
