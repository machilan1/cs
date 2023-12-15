import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  OmitType,
  PickType,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { UserCourse } from './entities/user-courses';
import { UserVideo } from './entities/user-video';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ operationId: 'createUser' })
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse({ type: OmitType(User, ['password'] as const) })
  async create(@Body() createUserDto: CreateUserDto) {
    const res = await this.usersService.create(createUserDto);
    return res[0];
  }

  @Get()
  @ApiOperation({ operationId: 'getUsers' })
  @ApiOkResponse({ type: [OmitType(User, ['password'] as const)] })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ operationId: 'getUserById' })
  @ApiOkResponse({ type: OmitType(User, ['password'] as const) })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const res = await this.usersService.findOne(id);
    return res[0];
  }

  @Patch(':id')
  @ApiOperation({ operationId: 'updateUser' })
  @ApiBody({
    type: PickType(UpdateUserDto, ['email', 'name', 'role'] as const),
  })
  @ApiOkResponse({ type: OmitType(User, ['password'] as const) })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateUserDto: Omit<UpdateUserDto, 'password' | 'userId' | 'createdAt'>
  ) {
    const res = await this.usersService.update(id, updateUserDto);
    return res[0];
  }

  @Delete(':id')
  @ApiOperation({ operationId: 'deleteUser' })
  @ApiOkResponse({ type: [OmitType(User, ['password'] as const)] })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const res = await this.usersService.remove(id);
    return res[0];
  }

  @ApiOperation({
    summary: '獲取一個用戶已經看過的影片',
    operationId: 'getViewedVideosByUserId',
  })
  @Get(':id/viewedVideos')
  @ApiOkResponse({ type: [UserVideo] })
  getViewedVideosByUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getViewedVideoByUserId(id);
  }

  @ApiOperation({
    summary: '獲取一個用戶收藏的影片',
    operationId: 'getFavoritesByUserId',
  })
  @Get(':id/favorites')
  @ApiOkResponse({ type: [UserVideo] })
  getFavoritesByUserId(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getFavoritesByUserId(id);
  }

  @ApiOperation({
    summary: '讀取一個老師擁有的影片',
    operationId: 'getOwnVideosByUserId',
  })
  @Get(':id/ownVideos')
  @ApiOkResponse({ type: [UserVideo] })
  getOwnVideosByUserId(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getOwnVideoByUserId(id);
  }

  @ApiOperation({
    summary: '讀取一個老師任教的課程',
    operationId: 'getTeachingCoursesByUserId',
  })
  @Get(':id/teachingCourses')
  @ApiOkResponse({ type: [UserCourse] })
  getTeachingCourseByUserId(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getOwnCoursesByUserId(id);
  }

  @ApiOperation({
    summary: '讀取一個用戶的播放清單',
    operationId: 'getPlaylistForUser',
  })
  @Get(':id/playlist')
  @ApiOkResponse({ type: [UserCourse] })
  getPlaylistByUserId(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getPlaylistForUser(id);
  }
}
