import { Injectable, inject } from '@angular/core';
import { injectMutation, injectQuery, injectQueryClient } from '@ngneat/query';
import { VideosService } from 'libs/shared/src/lib';

@Injectable({ providedIn: 'root' })
export class DetailStateService {
  #query = injectQuery();
  #mutation = injectMutation();
  #client = injectQueryClient();
  #videosService = inject(VideosService);

  getVideos(id: number) {
    return this.#query({
      queryKey: ['videos'],
      queryFn: () => this.#videosService.findVideos({ courseId: id }),
    });
  }

  getVideoById(id: number) {
    return this.#query({
      queryKey: ['video', id],
      queryFn: () => this.#videosService.findOneVideo({ id }),
    });
  }
}
