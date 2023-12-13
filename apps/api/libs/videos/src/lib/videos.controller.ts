import { Controller, Get } from '@nestjs/common';
import { VideosService } from './videos.service';

@Controller()
export class VideosController {
  constructor(private videosService: VideosService) {}

  @Get()
  get() {
    const res = this.videosService.findAll();
  }
}
