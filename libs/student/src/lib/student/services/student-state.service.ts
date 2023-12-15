import { inject } from '@angular/core';
import { Injectable } from '@nestjs/common';
import { injectQuery } from '@ngneat/query';
import { FavoritesService } from 'libs/shared/src/lib/services/favorites.service';
import { PlaylistsService } from 'libs/shared/src/lib/services/playlists.service';
import { UsersService } from 'libs/shared/src/lib/services/users.service';
import { ViewRecordService } from 'libs/shared/src/lib/services/view-record.service';

@Injectable()
export class StudentStateService {
  #query = injectQuery();

  #accountService = inject(UsersService);
  #playlistService = inject(PlaylistsService);
  #favoriteService = inject(FavoritesService);
  #historyService = inject(ViewRecordService);

  getAccount(id: number) {
    return this.#query({
      queryKey: ['account'],
      queryFn: () => this.#accountService.getUserById({ id }),
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
}
