/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Favorite } from '../../models/favorite';

export interface GetFavorite$Params {
  userId?: number | null;
}

export function getFavorite(http: HttpClient, rootUrl: string, params?: GetFavorite$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Favorite>>> {
  const rb = new RequestBuilder(rootUrl, getFavorite.PATH, 'get');
  if (params) {
    rb.query('userId', params.userId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Favorite>>;
    })
  );
}

getFavorite.PATH = '/favorites';
