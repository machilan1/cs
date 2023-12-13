import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
import { CourseEntity } from '../entities/course.entity';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  // Todo Return object on creation
  @ApiOperation({ operationId: 'createCourse' })
  @ApiBody({ type: CreateCourseDto })
  @ApiCreatedResponse({ description: 'Created' })
  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  @ApiOkResponse({ type: [CourseEntity] })
  @ApiOperation({ operationId: 'getCourses' })
  async findAll(): Promise<CourseEntity[]> {
    return this.coursesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ operationId: 'getCourseById' })
  @ApiOkResponse({ type: CourseEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.findOne(id);
  }

  @ApiBody({ type: UpdateCourseDto })
  @ApiOperation({ operationId: 'updateCourse' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCourseDto: UpdateCourseDto
  ) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @ApiOperation({ operationId: 'deleteCourse' })
  @ApiOkResponse({ description: 'Deleted' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.remove(id);
  }
}
