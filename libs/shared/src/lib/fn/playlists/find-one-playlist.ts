/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Playlist } from '../../models/playlist';

export interface FindOnePlaylist$Params {
  id: number;
}

export function findOnePlaylist(http: HttpClient, rootUrl: string, params: FindOnePlaylist$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Playlist>>> {
  const rb = new RequestBuilder(rootUrl, findOnePlaylist.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Playlist>>;
    })
  );
}

findOnePlaylist.PATH = '/playlists/{id}';