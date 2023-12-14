/* tslint:disable */
/* eslint-disable */
export interface User {
  avatar: string;
  createdAt: string;
  email: string;
  name: string;
  password: string;
  role: 'guest' | 'student' | 'teacher';
  userId: number;
}
