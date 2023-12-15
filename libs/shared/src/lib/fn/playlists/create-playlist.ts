/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CreatePlaylistDto } from '../../models/create-playlist-dto';
import { Playlist } from '../../models/playlist';

export interface CreatePlaylist$Params {
      body: CreatePlaylistDto
}

export function createPlaylist(http: HttpClient, rootUrl: string, params: CreatePlaylist$Params, context?: HttpContext): Observable<StrictHttpResponse<Playlist>> {
  const rb = new RequestBuilder(rootUrl, createPlaylist.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Playlist>;
    })
  );
}

createPlaylist.PATH = '/playlists';
