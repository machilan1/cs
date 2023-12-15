/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Video } from '../../models/video';

export interface FindOneVideo$Params {
  id: number;
}

export function findOneVideo(http: HttpClient, rootUrl: string, params: FindOneVideo$Params, context?: HttpContext): Observable<StrictHttpResponse<Video>> {
  const rb = new RequestBuilder(rootUrl, findOneVideo.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Video>;
    })
  );
}

findOneVideo.PATH = '/videos/{id}';
