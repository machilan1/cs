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
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dtos/create-video.dto';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Video } from './entities/video.entity';
import { UpdateVideoDto } from './dtos/update-video.dto';
import { User } from '@cs/users';

@ApiTags('videos')
@Controller('videos')
export class VideosController {
  constructor(private videosService: VideosService) {}

  @Post()
  @ApiBody({ type: CreateVideoDto })
  @ApiOkResponse({ type: [Video] })
  async createVideo(@Body() createVideoDto: CreateVideoDto): Promise<Video[]> {
    console.log(1234566778);
    const res = await this.videosService.create(createVideoDto);
    return res;
  }

  @Get()
  @ApiOkResponse({ type: [Video] })
  async findVideos(): Promise<Video[]> {
    const res = await this.videosService.findAll();
    return res;
  }

  @Patch(':id')
  @ApiBody({ type: UpdateVideoDto })
  @ApiOkResponse({ type: Video })
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
