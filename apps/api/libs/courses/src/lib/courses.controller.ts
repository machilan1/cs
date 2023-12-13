import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { ParseIntPipe } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CourseWithCategoryTeacher } from '@cs/shared';
import { Course } from '../entities/course.entity';
import { FilterCourseParams } from '../dto/fIlter-course.param';
import { Video } from '@cs/videos';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @ApiOperation({ operationId: 'createCourse' })
  @ApiBody({ type: CreateCourseDto })
  @ApiCreatedResponse({ type: Course })
  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  @ApiOkResponse({ type: [CourseWithCategoryTeacher] })
  @ApiOperation({ operationId: 'getCourses' })
  async findAll(@Query() params: FilterCourseParams) {
    return this.coursesService.findAll(params);
  }

  @Get(':id')
  @ApiOperation({ operationId: 'getCourseById' })
  @ApiOkResponse({ type: [CourseWithCategoryTeacher] })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.findOne(id);
  }

  @ApiBody({ type: UpdateCourseDto })
  @ApiOperation({ operationId: 'updateCourse' })
  @ApiOkResponse({ type: [Course] })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCourseDto: UpdateCourseDto
  ) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @ApiOperation({ operationId: 'deleteCourse' })
  @ApiOkResponse({ type: [Course] })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.remove(id);
  }

  @ApiOperation({
    summary: '讀取跟一堂課程相關的影片',
    operationId: 'getVideosForCourse',
  })
  @Get(':id/videos')
  @ApiOkResponse({ type: [Video] })
  getFavoritesByUserId(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.getVideosByCourseId(id);
  }
}
