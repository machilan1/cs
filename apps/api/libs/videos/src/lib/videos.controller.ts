import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dtos/create-video.dto';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Video } from './entities/video.entity';
import { UpdateVideoDto } from './dtos/update-video.dto';
import { User } from '@cs/users';
import { FilterVideoParams } from './entities/filter-video-params';

@ApiTags('videos')
@Controller('videos')
export class VideosController {
  constructor(private videosService: VideosService) {}

  @Post()
  @ApiBody({ type: CreateVideoDto })
  @ApiOkResponse({ type: [Video] })
  @ApiOperation({ operationId: 'createVideo' })
  async createVideo(@Body() createVideoDto: CreateVideoDto): Promise<Video[]> {
    const res = await this.videosService.create(createVideoDto);
    return res;
  }

  @Get()
  @ApiOkResponse({ type: [Video] })
  @ApiOperation({ operationId: 'findVideos' })
  async findVideos(@Query() params: FilterVideoParams): Promise<Video[]> {
    const res = await this.videosService.findAll(params);
    return res;
  }

  @Get(':id')
  @ApiOkResponse({ type: [Video] })
  @ApiOperation({ operationId: 'findOneVideo' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const res = await this.videosService.findOne(id);

    return res;
  }

  @Patch(':id')
  @ApiBody({ type: UpdateVideoDto })
  @ApiOkResponse({ type: Video })
  @ApiOperation({ operationId: 'updateVideo' })
  async updateVideo(
    @Body() updateVideoDto: UpdateVideoDto,
    @Param('id', ParseIntPipe) id: number
  ) {
    const res = await this.videosService.update(id, updateVideoDto);
    return res;
  }

  @Delete(':id')
  @ApiOkResponse({ type: Video })
  async deleteVideo(@Param('id', ParseIntPipe) id: number) {
    const res = await this.videosService.delete(id);
    return res;
  }

  @ApiOperation({ summary: '讀取所有看過特定一支影片的學生' })
  @Post(':id/students')
  @ApiOkResponse({ type: [User] })
  async getStudentsByVideoId(@Param('id', ParseIntPipe) videoId: number) {
    const res = await this.videosService.getStudentsByVideoId(videoId);
    return res;
  }
}
