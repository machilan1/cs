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
import { CreateCategoryDto } from './dtos/create-category.dto';
import { CategoryService } from './category.service';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Category } from './entities/category.entity';
import { UpdateCategoryDto } from './dtos/update-category.dto';

@Controller({ path: 'category' })
@ApiTags('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ operationId: 'createCategory' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiOkResponse({ type: [Category] })
  async create(@Body() body: CreateCategoryDto) {
    const res = await this.categoryService.create(body);
    return res;
  }

  @Get()
  @ApiOperation({ operationId: 'findCategories' })
  @ApiOkResponse({ type: [Category] })
  async get() {
    const res = await this.categoryService.getAll();
    return res;
  }

  @Patch(':id')
  @ApiOperation({ operationId: 'findCategory' })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiOkResponse({ type: [Category] })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    const res = await this.categoryService.update(id, updateCategoryDto);
    return res;
  }

  @Delete(':id')
  @ApiOperation({ operationId: 'deleteCategory' })
  @ApiOkResponse({ type: [Category] })
  async delete(@Param('id', ParseIntPipe) id: number) {
    const res = await this.categoryService.delete(id);
    return res;
  }
}
