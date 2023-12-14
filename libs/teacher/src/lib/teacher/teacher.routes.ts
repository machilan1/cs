import { Routes } from '@angular/router';
import { TeacherComponent } from './teacher.component';

export const TEACHER_ROUTES: Routes = [
  {
    path: '',
    component: TeacherComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./teacher-account.component').then(
            (m) => m.TeacherAccountComponent,
          ),
      },
      {
        path: 'favorites',
        loadComponent: () =>
          import('./teacher-favorites.component').then(
            (m) => m.TeacherFavoritesComponent,
          ),
      },
      {
        path: 'history',
        loadComponent: () =>
          import('./teacher-history.component').then(
            (m) => m.TeacherHistoryComponent,
          ),
      },
      {
        path: 'playlist',
        loadComponent: () =>
          import('./teacher-playlist.component').then(
            (m) => m.TeacherPlaylistComponent,
          ),
      },
      {
        path: 'courses',
        loadComponent: () =>
          import('./teacher-courses.component').then(
            (m) => m.TeacherCoursesComponent,
          ),
      },
    ],
  },
];
