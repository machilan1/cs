/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OmitTypeClass } from '../../models/omit-type-class';

export interface DeleteUser$Params {
  id: number;
}

export function deleteUser(http: HttpClient, rootUrl: string, params: DeleteUser$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OmitTypeClass>>> {
  const rb = new RequestBuilder(rootUrl, deleteUser.PATH, 'delete');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<OmitTypeClass>>;
    })
  );
}

deleteUser.PATH = '/users/{id}';
