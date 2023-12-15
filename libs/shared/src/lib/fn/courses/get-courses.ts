/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CourseWithCategoryTeacher } from '../../models/course-with-category-teacher';

export interface GetCourses$Params {
  categoryId?: number | null;
}

export function getCourses(http: HttpClient, rootUrl: string, params?: GetCourses$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CourseWithCategoryTeacher>>> {
  const rb = new RequestBuilder(rootUrl, getCourses.PATH, 'get');
  if (params) {
    rb.query('categoryId', params.categoryId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<CourseWithCategoryTeacher>>;
    })
  );
}

getCourses.PATH = '/courses';
