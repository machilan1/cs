import { Routes } from '@angular/router';
import { ShellComponent } from './shell.component';

export const SHELL_ROUTES: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('@cs/home').then((m) => m.HomeComponent),
      },
      {
        path: 'login',
        canActivate: [],
        loadComponent: () => import('@cs/login').then((m) => m.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('@cs/register').then((m) => m.RegisterComponent),
      },
      {
        path: 'course/:courseId',
        loadComponent: () =>
          import('@cs/course').then((m) => m.CourseComponent),
      },
      {
        path: 'course-detail',
        loadComponent: () =>
          import('@cs/course').then((m) => m.CourseDetailComponent),
      },
      {
        path: 'student',
        canActivate: [],
        loadChildren: () => import('@cs/student').then((m) => m.STUDENT_ROUTES),
      },
      {
        path: 'teacher',
        loadChildren: () => import('@cs/teacher').then((m) => m.TEACHER_ROUTES),
      },
      {
        path: 'teacher-course-detail',
        loadComponent: () =>
          import('@cs/teacher').then((m) => m.TeacherCourseDetailComponent),
      },
      {
        path: 'teacher-course-edit',
        loadComponent: () =>
          import('@cs/teacher').then((m) => m.TeacherCourseEditComponent),
      },
    ],
  },
];
