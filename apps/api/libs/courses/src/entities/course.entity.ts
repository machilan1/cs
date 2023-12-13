/* eslint-disable @nx/enforce-module-boundaries */

import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from '@cs/users';
import { SelectCategory } from '@cs/shared';
import { CategoryEntity } from './category.entity';

export class CourseEntity {
  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  courseId!: number;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  description!: string;

  @ApiProperty({ type: PickType(User, ['userId', 'name', 'email']) })
  teacher!: Partial<User>;

  @ApiProperty({ type: CategoryEntity })
  category!: SelectCategory;

  constructor(partial: Partial<CourseEntity>) {
    Object.assign(this, partial);
  }
}
