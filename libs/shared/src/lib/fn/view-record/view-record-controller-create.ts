/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CreateViewRecordDto } from '../../models/create-view-record-dto';
import { ViewRecord } from '../../models/view-record';

export interface ViewRecordControllerCreate$Params {
      body: CreateViewRecordDto
}

export function viewRecordControllerCreate(http: HttpClient, rootUrl: string, params: ViewRecordControllerCreate$Params, context?: HttpContext): Observable<StrictHttpResponse<ViewRecord>> {
  const rb = new RequestBuilder(rootUrl, viewRecordControllerCreate.PATH, 'post');
  if (params) {
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

viewRecordControllerCreate.PATH = '/view-record';
