import { ApiProperty } from '@nestjs/swagger';
import { SelectUser } from '@cs/shared';
import { Exclude } from 'class-transformer';

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

  @Exclude()
  password!: string;

  @ApiProperty({ type: String, nullable: true })
  avatar!: string | null;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
