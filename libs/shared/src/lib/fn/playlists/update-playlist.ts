/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Playlist } from '../../models/playlist';
import { UpdatePlaylistDto } from '../../models/update-playlist-dto';

export interface UpdatePlaylist$Params {
  id: number;
      body: UpdatePlaylistDto
}

export function updatePlaylist(http: HttpClient, rootUrl: string, params: UpdatePlaylist$Params, context?: HttpContext): Observable<StrictHttpResponse<Playlist>> {
  const rb = new RequestBuilder(rootUrl, updatePlaylist.PATH, 'patch');
  if (params) {
    rb.path('id', params.id, {});
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

updatePlaylist.PATH = '/playlists/{id}';
