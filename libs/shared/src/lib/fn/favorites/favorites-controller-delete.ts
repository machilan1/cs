/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Favorite } from '../../models/favorite';

export interface FavoritesControllerDelete$Params {
  id: number;
}

export function favoritesControllerDelete(http: HttpClient, rootUrl: string, params: FavoritesControllerDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Favorite>>> {
  const rb = new RequestBuilder(rootUrl, favoritesControllerDelete.PATH, 'delete');
  if (params) {
    rb.path('id', params.id, {});
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

favoritesControllerDelete.PATH = '/favorites/{id}';
