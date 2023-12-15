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
import { Course } from '../entities/course.entity';
import { FilterCourseParams } from '../dto/fIlter-course.param';
import { CourseWithCategoryTeacher } from '@cs/shared';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @ApiOperation({ operationId: 'createCourse' })
  @ApiBody({ type: CreateCourseDto })
  @ApiCreatedResponse({ type: Course })
  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    const res = await this.coursesService.create(createCourseDto);
    return res[0];
  }

  @Get()
  @ApiOkResponse({ type: [CourseWithCategoryTeacher] })
  @ApiOperation({ operationId: 'getCourses' })
  async findAll(@Query() params: FilterCourseParams) {
    return this.coursesService.findAll(params);
  }

  @Get(':id')
  @ApiOperation({ operationId: 'getCourseById' })
  @ApiOkResponse({ type: CourseWithCategoryTeacher })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const res = await this.coursesService.findOne(id);
    return res[0];
  }

  @ApiBody({ type: UpdateCourseDto })
  @ApiOperation({ operationId: 'updateCourse' })
  @ApiOkResponse({ type: Course })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCourseDto: UpdateCourseDto
  ) {
    const res = await this.coursesService.update(id, updateCourseDto);
    return res[0];
  }

  @ApiOperation({ operationId: 'deleteCourse' })
  @ApiOkResponse({ type: Course })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const res = await this.coursesService.remove(id);
    return res[0];
  }
}
