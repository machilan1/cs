/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Playlist } from '../../models/playlist';

export interface DeletePlaylist$Params {
  id: number;
}

export function deletePlaylist(http: HttpClient, rootUrl: string, params: DeletePlaylist$Params, context?: HttpContext): Observable<StrictHttpResponse<Playlist>> {
  const rb = new RequestBuilder(rootUrl, deletePlaylist.PATH, 'delete');
  if (params) {
    rb.path('id', params.id, {});
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

deletePlaylist.PATH = '/playlists/{id}';
