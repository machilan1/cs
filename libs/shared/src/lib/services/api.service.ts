/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { fileControllerUploadFile } from '../fn/operations/file-controller-upload-file';
import { FileControllerUploadFile$Params } from '../fn/operations/file-controller-upload-file';

@Injectable({ providedIn: 'root' })
export class ApiService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `fileControllerUploadFile()` */
  static readonly FileControllerUploadFilePath = '/file/upload';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `fileControllerUploadFile()` instead.
   *
   * This method doesn't expect any request body.
   */
  fileControllerUploadFile$Response(params?: FileControllerUploadFile$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return fileControllerUploadFile(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `fileControllerUploadFile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  fileControllerUploadFile(params?: FileControllerUploadFile$Params, context?: HttpContext): Observable<void> {
    return this.fileControllerUploadFile$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
