
import { Routes } from '@angular/router';
import { StudentComponent } from './student.component';

export const STUDENT_ROUTES: Routes = [
  {
    path: '',
    component: StudentComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./student-account.component').then((m) => m.StudentAccountComponent),
      },
      {
        path: 'favorites',
        loadComponent: () => import('./student-favorites.component').then((m) => m.StudentFavoritesComponent),
      },
      {
        path: 'history',
        loadComponent: () => import('./student-history.component').then((m) => m.StudentHistoryComponent),
      },
      {
        path: 'playlist',
        loadComponent: () => import('./student-playlist.component').then((m) => m.StudentPlaylistComponent),
      },
    ],
  },
];
