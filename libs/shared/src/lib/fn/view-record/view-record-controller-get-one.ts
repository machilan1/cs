/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ViewRecord } from '../../models/view-record';

export interface ViewRecordControllerGetOne$Params {
  id: number;
}

export function viewRecordControllerGetOne(http: HttpClient, rootUrl: string, params: ViewRecordControllerGetOne$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ViewRecord>>> {
  const rb = new RequestBuilder(rootUrl, viewRecordControllerGetOne.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ViewRecord>>;
    })
  );
}

viewRecordControllerGetOne.PATH = '/view-record/{id}';
