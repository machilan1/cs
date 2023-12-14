/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Course } from '../../models/course';

export interface DeleteCourse$Params {
  id: number;
}

export function deleteCourse(http: HttpClient, rootUrl: string, params: DeleteCourse$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Course>>> {
  const rb = new RequestBuilder(rootUrl, deleteCourse.PATH, 'delete');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Course>>;
    })
  );
}

deleteCourse.PATH = '/courses/{id}';
