/* tslint:disable */
/* eslint-disable */
export interface User {
  avatar: string | null;
  createdAt: string;
  email: string;
  name: string;
  role: 'guest' | 'student' | 'teacher';
  userId: number;
}
