/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UpdateViewRecordDto } from '../../models/update-view-record-dto';
import { ViewRecord } from '../../models/view-record';

export interface ViewRecordControllerUpdateOne$Params {
  id: number;
      body: UpdateViewRecordDto
}

export function viewRecordControllerUpdateOne(http: HttpClient, rootUrl: string, params: ViewRecordControllerUpdateOne$Params, context?: HttpContext): Observable<StrictHttpResponse<ViewRecord>> {
  const rb = new RequestBuilder(rootUrl, viewRecordControllerUpdateOne.PATH, 'patch');
  if (params) {
    rb.path('id', params.id, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ViewRecord>;
    })
  );
}

viewRecordControllerUpdateOne.PATH = '/view-record/{id}';
