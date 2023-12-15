/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { changeUserSRole } from '../fn/auth/change-user-s-role';
import { ChangeUserSRole$Params } from '../fn/auth/change-user-s-role';
import { findMe } from '../fn/auth/find-me';
import { FindMe$Params } from '../fn/auth/find-me';
import { login } from '../fn/auth/login';
import { Login$Params } from '../fn/auth/login';
import { LoginResponse } from '../models/login-response';
import { OmitTypeClass } from '../models/omit-type-class';
import { register } from '../fn/auth/register';
import { Register$Params } from '../fn/auth/register';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `register()` */
  static readonly RegisterPath = '/auth/register';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `register()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register$Response(params: Register$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return register(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `register$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register(params: Register$Params, context?: HttpContext): Observable<void> {
    return this.register$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `login()` */
  static readonly LoginPath = '/auth/login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `login()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login$Response(params: Login$Params, context?: HttpContext): Observable<StrictHttpResponse<LoginResponse>> {
    return login(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `login$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login(params: Login$Params, context?: HttpContext): Observable<LoginResponse> {
    return this.login$Response(params, context).pipe(
      map((r: StrictHttpResponse<LoginResponse>): LoginResponse => r.body)
    );
  }

  /** Path part for operation `findMe()` */
  static readonly FindMePath = '/auth/me';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findMe()` instead.
   *
   * This method doesn't expect any request body.
   */
  findMe$Response(params?: FindMe$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return findMe(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findMe$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findMe(params?: FindMe$Params, context?: HttpContext): Observable<User> {
    return this.findMe$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /** Path part for operation `changeUserSRole()` */
  static readonly ChangeUserSRolePath = '/auth/changeRole';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changeUserSRole()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changeUserSRole$Response(params: ChangeUserSRole$Params, context?: HttpContext): Observable<StrictHttpResponse<OmitTypeClass>> {
    return changeUserSRole(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `changeUserSRole$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changeUserSRole(params: ChangeUserSRole$Params, context?: HttpContext): Observable<OmitTypeClass> {
    return this.changeUserSRole$Response(params, context).pipe(
      map((r: StrictHttpResponse<OmitTypeClass>): OmitTypeClass => r.body)
    );
  }

}
