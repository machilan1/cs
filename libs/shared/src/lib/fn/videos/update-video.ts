/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UpdateVideoDto } from '../../models/update-video-dto';
import { Video } from '../../models/video';

export interface UpdateVideo$Params {
  id: number;
      body: UpdateVideoDto
}

export function updateVideo(http: HttpClient, rootUrl: string, params: UpdateVideo$Params, context?: HttpContext): Observable<StrictHttpResponse<Video>> {
  const rb = new RequestBuilder(rootUrl, updateVideo.PATH, 'patch');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
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

updateVideo.PATH = '/videos/{id}';
