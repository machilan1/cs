import { FavoritesService } from './../../shared/src/lib/services/favorites.service';
import { PlaylistsService } from './../../shared/src/lib/services/playlists.service';
import { UsersService } from './../../shared/src/lib/services/users.service';
import { ViewRecordService } from './../../shared/src/lib/services/view-record.service';
import { CoursesService } from './../../shared/src/lib/services/courses.service';

import { Injectable, inject } from '@angular/core';
import { injectQuery } from '@ngneat/query';

@Injectable()
export class TeacherStateService {
  #query = injectQuery();

  #accountService = inject(UsersService);
  #playlistService = inject(PlaylistsService);
  #favoriteService = inject(FavoritesService);
  #historyService = inject(ViewRecordService);
  #courseService = inject(CoursesService);

  getAccount(id: number) {
    return this.#query({
      queryKey: ['account'],
      queryFn: () => this.#accountService.getUsers(id),
    });
  }

  getPlaylists() {
    return this.#query({
      queryKey: ['playlists'],
      queryFn: () => this.#playlistService.findPlaylists(),
    });
  }

  getFavorites() {
    return this.#query({
      queryKey: ['favorites'],
      queryFn: () => this.#favoriteService.getFavorite(),
    });
  }

  getHistory() {
    return this.#query({
      queryKey: ['history'],
      queryFn: () => this.#historyService.viewRecordControllerGetAll(),
    });
  }

  getCourses() {
    return this.#query({
      queryKey: ['courses'],
      queryFn: () => this.#courseService.getCourses(),
    });
  }
}
