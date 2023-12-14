/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Video } from '../../models/video';

export interface FindVideos$Params {
  courseId?: number | null;
}

export function findVideos(http: HttpClient, rootUrl: string, params?: FindVideos$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Video>>> {
  const rb = new RequestBuilder(rootUrl, findVideos.PATH, 'get');
  if (params) {
    rb.query('courseId', params.courseId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Video>>;
    })
  );
}

findVideos.PATH = '/videos';
