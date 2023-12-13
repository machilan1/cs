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

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Todo Return object on create
  @ApiOperation({ operationId: 'createUser' })
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse({ type: [OmitType(User, ['password'] as const)] })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ operationId: 'getUsers' })
  @ApiOkResponse({ type: [OmitType(User, ['password'] as const)] })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ operationId: 'getUserById' })
  @ApiOkResponse({ type: [OmitType(User, ['password'] as const)] })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ operationId: 'updateUser' })
  @ApiBody({
    type: PickType(UpdateUserDto, ['email', 'name', 'role'] as const),
  })
  @ApiOkResponse({ type: [OmitType(User, ['password'] as const)] })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateUserDto: Omit<UpdateUserDto, 'password' | 'userId' | 'createdAt'>
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ operationId: 'deleteUser' })
  @ApiOkResponse({ type: [OmitType(User, ['password'] as const)] })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
