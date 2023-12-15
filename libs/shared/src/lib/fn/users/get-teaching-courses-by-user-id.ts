/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UserCourse } from '../../models/user-course';

export interface GetTeachingCoursesByUserId$Params {
  id: number;
}

export function getTeachingCoursesByUserId(http: HttpClient, rootUrl: string, params: GetTeachingCoursesByUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserCourse>>> {
  const rb = new RequestBuilder(rootUrl, getTeachingCoursesByUserId.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<UserCourse>>;
    })
  );
}

getTeachingCoursesByUserId.PATH = '/users/{id}/teachingCourses';
