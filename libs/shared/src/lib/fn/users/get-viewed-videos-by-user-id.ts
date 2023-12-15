/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UserVideo } from '../../models/user-video';

export interface GetViewedVideosByUserId$Params {
  id: number;
}

export function getViewedVideosByUserId(http: HttpClient, rootUrl: string, params: GetViewedVideosByUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserVideo>>> {
  const rb = new RequestBuilder(rootUrl, getViewedVideosByUserId.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<UserVideo>>;
    })
  );
}

getViewedVideosByUserId.PATH = '/users/{id}/viewedVideos';
