/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Course } from '../../models/course';
import { CreateCourseDto } from '../../models/create-course-dto';

export interface CreateCourse$Params {
      body: CreateCourseDto
}

export function createCourse(http: HttpClient, rootUrl: string, params: CreateCourse$Params, context?: HttpContext): Observable<StrictHttpResponse<Course>> {
  const rb = new RequestBuilder(rootUrl, createCourse.PATH, 'post');
  if (params) {
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

createCourse.PATH = '/courses';
