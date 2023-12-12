import { ApiProperty } from '@nestjs/swagger';
import { SelectUser } from '@cs/shared';

enum Role {
  guest = 'guest',
  student = 'student',
  teacher = 'teacher',
}

export class User implements SelectUser {
  @ApiProperty({ type: Number })
  userId!: number;

  @ApiProperty({ enum: Role })
  role!: 'guest' | 'student' | 'teacher';

  @ApiProperty({ type: String })
  name!: string;

  @ApiProperty({ type: String })
  email!: string;

  @ApiProperty({ type: Date })
  createdAt!: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
