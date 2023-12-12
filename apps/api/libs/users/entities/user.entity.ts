import { SelectUser } from '../../shared/src';

export class User implements SelectUser {
  userId: number;
  role: 'guest' | 'student' | 'teacher';
  name: string;
  email: string;
  createdAt: Date;
}
