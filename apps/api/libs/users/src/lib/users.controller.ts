import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBody,
  ApiNotFoundResponse,
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
  @ApiOkResponse({ type: User })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ operationId: 'getUsers' })
  @ApiOkResponse({ type: [User] })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ operationId: 'getUserById' })
  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse()
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const res = await this.usersService.findOne(id);
    if (!res) {
      throw new NotFoundException();
    }
    return res;
  }

  @Patch(':id')
  @ApiOperation({ operationId: 'updateUser' })
  @ApiBody({
    type: PickType(UpdateUserDto, ['email', 'name', 'role'] as const),
  })
  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateUserDto: Omit<UpdateUserDto, 'password' | 'userId' | 'createdAt'>
  ): Promise<User> {
    const res = await this.usersService.update(id, updateUserDto);
    if (!res) {
      throw new NotFoundException();
    }
    return res;
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
