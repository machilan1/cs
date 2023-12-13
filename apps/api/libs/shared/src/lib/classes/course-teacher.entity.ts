import { ApiProperty } from '@nestjs/swagger';
import { SelectUser } from '../drizzle/schema';

export class CourseTeacher
  implements Pick<SelectUser, 'userId' | 'name' | 'email'>
{
  @ApiProperty()
  userId!: number;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  email!: string;
}
