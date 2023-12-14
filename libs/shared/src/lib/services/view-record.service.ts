/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { ViewRecord } from '../models/view-record';
import { viewRecordControllerCreate } from '../fn/view-record/view-record-controller-create';
import { ViewRecordControllerCreate$Params } from '../fn/view-record/view-record-controller-create';
import { viewRecordControllerDeleteOne } from '../fn/view-record/view-record-controller-delete-one';
import { ViewRecordControllerDeleteOne$Params } from '../fn/view-record/view-record-controller-delete-one';
import { viewRecordControllerGetAll } from '../fn/view-record/view-record-controller-get-all';
import { ViewRecordControllerGetAll$Params } from '../fn/view-record/view-record-controller-get-all';
import { viewRecordControllerGetOne } from '../fn/view-record/view-record-controller-get-one';
import { ViewRecordControllerGetOne$Params } from '../fn/view-record/view-record-controller-get-one';
import { viewRecordControllerUpdateOne } from '../fn/view-record/view-record-controller-update-one';
import { ViewRecordControllerUpdateOne$Params } from '../fn/view-record/view-record-controller-update-one';

@Injectable({ providedIn: 'root' })
export class ViewRecordService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `viewRecordControllerGetAll()` */
  static readonly ViewRecordControllerGetAllPath = '/view-record';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `viewRecordControllerGetAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  viewRecordControllerGetAll$Response(params?: ViewRecordControllerGetAll$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ViewRecord>>> {
    return viewRecordControllerGetAll(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `viewRecordControllerGetAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  viewRecordControllerGetAll(params?: ViewRecordControllerGetAll$Params, context?: HttpContext): Observable<Array<ViewRecord>> {
    return this.viewRecordControllerGetAll$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ViewRecord>>): Array<ViewRecord> => r.body)
    );
  }

  /** Path part for operation `viewRecordControllerCreate()` */
  static readonly ViewRecordControllerCreatePath = '/view-record';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `viewRecordControllerCreate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  viewRecordControllerCreate$Response(params: ViewRecordControllerCreate$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ViewRecord>>> {
    return viewRecordControllerCreate(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `viewRecordControllerCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  viewRecordControllerCreate(params: ViewRecordControllerCreate$Params, context?: HttpContext): Observable<Array<ViewRecord>> {
    return this.viewRecordControllerCreate$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ViewRecord>>): Array<ViewRecord> => r.body)
    );
  }

  /** Path part for operation `viewRecordControllerGetOne()` */
  static readonly ViewRecordControllerGetOnePath = '/view-record/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `viewRecordControllerGetOne()` instead.
   *
   * This method doesn't expect any request body.
   */
  viewRecordControllerGetOne$Response(params: ViewRecordControllerGetOne$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ViewRecord>>> {
    return viewRecordControllerGetOne(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `viewRecordControllerGetOne$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  viewRecordControllerGetOne(params: ViewRecordControllerGetOne$Params, context?: HttpContext): Observable<Array<ViewRecord>> {
    return this.viewRecordControllerGetOne$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ViewRecord>>): Array<ViewRecord> => r.body)
    );
  }

  /** Path part for operation `viewRecordControllerDeleteOne()` */
  static readonly ViewRecordControllerDeleteOnePath = '/view-record/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `viewRecordControllerDeleteOne()` instead.
   *
   * This method doesn't expect any request body.
   */
  viewRecordControllerDeleteOne$Response(params: ViewRecordControllerDeleteOne$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ViewRecord>>> {
    return viewRecordControllerDeleteOne(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `viewRecordControllerDeleteOne$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  viewRecordControllerDeleteOne(params: ViewRecordControllerDeleteOne$Params, context?: HttpContext): Observable<Array<ViewRecord>> {
    return this.viewRecordControllerDeleteOne$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ViewRecord>>): Array<ViewRecord> => r.body)
    );
  }

  /** Path part for operation `viewRecordControllerUpdateOne()` */
  static readonly ViewRecordControllerUpdateOnePath = '/view-record/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `viewRecordControllerUpdateOne()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  viewRecordControllerUpdateOne$Response(params: ViewRecordControllerUpdateOne$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ViewRecord>>> {
    return viewRecordControllerUpdateOne(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `viewRecordControllerUpdateOne$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  viewRecordControllerUpdateOne(params: ViewRecordControllerUpdateOne$Params, context?: HttpContext): Observable<Array<ViewRecord>> {
    return this.viewRecordControllerUpdateOne$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ViewRecord>>): Array<ViewRecord> => r.body)
    );
  }

}
