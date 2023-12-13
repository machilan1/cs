import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { DatabaseModule } from '@cs/shared';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [DatabaseModule],
  exports: [],
})
export class CategoryModule {}
