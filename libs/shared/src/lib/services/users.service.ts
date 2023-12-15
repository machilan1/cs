/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createUser } from '../fn/users/create-user';
import { CreateUser$Params } from '../fn/users/create-user';
import { deleteUser } from '../fn/users/delete-user';
import { DeleteUser$Params } from '../fn/users/delete-user';
import { getFavoritesByUserId } from '../fn/users/get-favorites-by-user-id';
import { GetFavoritesByUserId$Params } from '../fn/users/get-favorites-by-user-id';
import { getOwnVideosByUserId } from '../fn/users/get-own-videos-by-user-id';
import { GetOwnVideosByUserId$Params } from '../fn/users/get-own-videos-by-user-id';
import { getPlaylistForUser } from '../fn/users/get-playlist-for-user';
import { GetPlaylistForUser$Params } from '../fn/users/get-playlist-for-user';
import { getTeachingCoursesByUserId } from '../fn/users/get-teaching-courses-by-user-id';
import { GetTeachingCoursesByUserId$Params } from '../fn/users/get-teaching-courses-by-user-id';
import { getUserById } from '../fn/users/get-user-by-id';
import { GetUserById$Params } from '../fn/users/get-user-by-id';
import { getUsers } from '../fn/users/get-users';
import { GetUsers$Params } from '../fn/users/get-users';
import { getViewedVideosByUserId } from '../fn/users/get-viewed-videos-by-user-id';
import { GetViewedVideosByUserId$Params } from '../fn/users/get-viewed-videos-by-user-id';
import { OmitTypeClass } from '../models/omit-type-class';
import { updateUser } from '../fn/users/update-user';
import { UpdateUser$Params } from '../fn/users/update-user';
import { UserCourse } from '../models/user-course';
import { UserVideo } from '../models/user-video';

@Injectable({ providedIn: 'root' })
export class UsersService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getUsers()` */
  static readonly GetUsersPath = '/users';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUsers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUsers$Response(params?: GetUsers$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OmitTypeClass>>> {
    return getUsers(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUsers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUsers(params?: GetUsers$Params, context?: HttpContext): Observable<Array<OmitTypeClass>> {
    return this.getUsers$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<OmitTypeClass>>): Array<OmitTypeClass> => r.body)
    );
  }

  /** Path part for operation `createUser()` */
  static readonly CreateUserPath = '/users';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createUser$Response(params: CreateUser$Params, context?: HttpContext): Observable<StrictHttpResponse<OmitTypeClass>> {
    return createUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createUser(params: CreateUser$Params, context?: HttpContext): Observable<OmitTypeClass> {
    return this.createUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<OmitTypeClass>): OmitTypeClass => r.body)
    );
  }

  /** Path part for operation `getUserById()` */
  static readonly GetUserByIdPath = '/users/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserById$Response(params: GetUserById$Params, context?: HttpContext): Observable<StrictHttpResponse<OmitTypeClass>> {
    return getUserById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUserById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserById(params: GetUserById$Params, context?: HttpContext): Observable<OmitTypeClass> {
    return this.getUserById$Response(params, context).pipe(
      map((r: StrictHttpResponse<OmitTypeClass>): OmitTypeClass => r.body)
    );
  }

  /** Path part for operation `deleteUser()` */
  static readonly DeleteUserPath = '/users/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser$Response(params: DeleteUser$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OmitTypeClass>>> {
    return deleteUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser(params: DeleteUser$Params, context?: HttpContext): Observable<Array<OmitTypeClass>> {
    return this.deleteUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<OmitTypeClass>>): Array<OmitTypeClass> => r.body)
    );
  }

  /** Path part for operation `updateUser()` */
  static readonly UpdateUserPath = '/users/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUser$Response(params: UpdateUser$Params, context?: HttpContext): Observable<StrictHttpResponse<OmitTypeClass>> {
    return updateUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUser(params: UpdateUser$Params, context?: HttpContext): Observable<OmitTypeClass> {
    return this.updateUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<OmitTypeClass>): OmitTypeClass => r.body)
    );
  }

  /** Path part for operation `getViewedVideosByUserId()` */
  static readonly GetViewedVideosByUserIdPath = '/users/{id}/viewedVideos';

  /**
   * 獲取一個用戶已經看過的影片.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getViewedVideosByUserId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getViewedVideosByUserId$Response(params: GetViewedVideosByUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserVideo>>> {
    return getViewedVideosByUserId(this.http, this.rootUrl, params, context);
  }

  /**
   * 獲取一個用戶已經看過的影片.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getViewedVideosByUserId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getViewedVideosByUserId(params: GetViewedVideosByUserId$Params, context?: HttpContext): Observable<Array<UserVideo>> {
    return this.getViewedVideosByUserId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<UserVideo>>): Array<UserVideo> => r.body)
    );
  }

  /** Path part for operation `getFavoritesByUserId()` */
  static readonly GetFavoritesByUserIdPath = '/users/{id}/favorites';

  /**
   * 獲取一個用戶收藏的影片.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFavoritesByUserId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFavoritesByUserId$Response(params: GetFavoritesByUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserVideo>>> {
    return getFavoritesByUserId(this.http, this.rootUrl, params, context);
  }

  /**
   * 獲取一個用戶收藏的影片.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getFavoritesByUserId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFavoritesByUserId(params: GetFavoritesByUserId$Params, context?: HttpContext): Observable<Array<UserVideo>> {
    return this.getFavoritesByUserId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<UserVideo>>): Array<UserVideo> => r.body)
    );
  }

  /** Path part for operation `getOwnVideosByUserId()` */
  static readonly GetOwnVideosByUserIdPath = '/users/{id}/ownVideos';

  /**
   * 讀取一個老師擁有的影片.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOwnVideosByUserId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOwnVideosByUserId$Response(params: GetOwnVideosByUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserVideo>>> {
    return getOwnVideosByUserId(this.http, this.rootUrl, params, context);
  }

  /**
   * 讀取一個老師擁有的影片.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getOwnVideosByUserId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOwnVideosByUserId(params: GetOwnVideosByUserId$Params, context?: HttpContext): Observable<Array<UserVideo>> {
    return this.getOwnVideosByUserId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<UserVideo>>): Array<UserVideo> => r.body)
    );
  }

  /** Path part for operation `getTeachingCoursesByUserId()` */
  static readonly GetTeachingCoursesByUserIdPath = '/users/{id}/teachingCourses';

  /**
   * 讀取一個老師任教的課程.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTeachingCoursesByUserId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTeachingCoursesByUserId$Response(params: GetTeachingCoursesByUserId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserCourse>>> {
    return getTeachingCoursesByUserId(this.http, this.rootUrl, params, context);
  }

  /**
   * 讀取一個老師任教的課程.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTeachingCoursesByUserId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTeachingCoursesByUserId(params: GetTeachingCoursesByUserId$Params, context?: HttpContext): Observable<Array<UserCourse>> {
    return this.getTeachingCoursesByUserId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<UserCourse>>): Array<UserCourse> => r.body)
    );
  }

  /** Path part for operation `getPlaylistForUser()` */
  static readonly GetPlaylistForUserPath = '/users/{id}/playlist';

  /**
   * 讀取一個用戶的播放清單.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPlaylistForUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPlaylistForUser$Response(params: GetPlaylistForUser$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserCourse>>> {
    return getPlaylistForUser(this.http, this.rootUrl, params, context);
  }

  /**
   * 讀取一個用戶的播放清單.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPlaylistForUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPlaylistForUser(params: GetPlaylistForUser$Params, context?: HttpContext): Observable<Array<UserCourse>> {
    return this.getPlaylistForUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<UserCourse>>): Array<UserCourse> => r.body)
    );
  }

}
