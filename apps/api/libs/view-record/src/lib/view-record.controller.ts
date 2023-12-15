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
import { ViewRecordService } from './view-record.service';
import { CreateViewRecordDto } from './dtos/create-view-record.dto';
import { UpdateViewRecordDto } from './dtos/update-view-record.dto';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ViewRecord } from './entities/view-record.entity';

@ApiTags('view-record')
@Controller('view-record')
export class ViewRecordController {
  constructor(private viewRecordService: ViewRecordService) {}

  @Post()
  @ApiBody({ type: CreateViewRecordDto })
  @ApiOkResponse({ type: ViewRecord })
  async create(@Body() createViewRecordDto: CreateViewRecordDto) {
    const res = await this.viewRecordService.create(createViewRecordDto);
    return res[0];
  }

  @Get()
  @ApiOkResponse({ type: [ViewRecord] })
  async getAll() {
    const res = await this.viewRecordService.findAll();
    return res;
  }

  @Get(':id')
  @ApiOkResponse({ type: ViewRecord })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const res = await this.viewRecordService.findOneById(id);
    return res[0];
  }

  @Patch(':id')
  @ApiBody({ type: UpdateViewRecordDto })
  @ApiOkResponse({ type: ViewRecord })
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateViewRecordDto: UpdateViewRecordDto
  ) {
    const res = await this.viewRecordService.update(id, updateViewRecordDto);
    return res[0];
  }

  @Delete(':id')
  @ApiOkResponse({ type: ViewRecord })
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    const res = await this.viewRecordService.delete(id);
    return res[0];
  }
}
