/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Course } from '../../models/course';
import { UpdateCourseDto } from '../../models/update-course-dto';

export interface UpdateCourse$Params {
  id: number;
      body: UpdateCourseDto
}

export function updateCourse(http: HttpClient, rootUrl: string, params: UpdateCourse$Params, context?: HttpContext): Observable<StrictHttpResponse<Course>> {
  const rb = new RequestBuilder(rootUrl, updateCourse.PATH, 'patch');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Course>;
    })
  );
}

updateCourse.PATH = '/courses/{id}';
