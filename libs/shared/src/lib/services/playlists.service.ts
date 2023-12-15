/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createPlaylist } from '../fn/playlists/create-playlist';
import { CreatePlaylist$Params } from '../fn/playlists/create-playlist';
import { deletePlaylist } from '../fn/playlists/delete-playlist';
import { DeletePlaylist$Params } from '../fn/playlists/delete-playlist';
import { findOnePlaylist } from '../fn/playlists/find-one-playlist';
import { FindOnePlaylist$Params } from '../fn/playlists/find-one-playlist';
import { findPlaylists } from '../fn/playlists/find-playlists';
import { FindPlaylists$Params } from '../fn/playlists/find-playlists';
import { Playlist } from '../models/playlist';
import { updatePlaylist } from '../fn/playlists/update-playlist';
import { UpdatePlaylist$Params } from '../fn/playlists/update-playlist';

@Injectable({ providedIn: 'root' })
export class PlaylistsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findPlaylists()` */
  static readonly FindPlaylistsPath = '/playlists';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findPlaylists()` instead.
   *
   * This method doesn't expect any request body.
   */
  findPlaylists$Response(params?: FindPlaylists$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Playlist>>> {
    return findPlaylists(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findPlaylists$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findPlaylists(params?: FindPlaylists$Params, context?: HttpContext): Observable<Array<Playlist>> {
    return this.findPlaylists$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Playlist>>): Array<Playlist> => r.body)
    );
  }

  /** Path part for operation `createPlaylist()` */
  static readonly CreatePlaylistPath = '/playlists';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createPlaylist()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPlaylist$Response(params: CreatePlaylist$Params, context?: HttpContext): Observable<StrictHttpResponse<Playlist>> {
    return createPlaylist(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createPlaylist$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPlaylist(params: CreatePlaylist$Params, context?: HttpContext): Observable<Playlist> {
    return this.createPlaylist$Response(params, context).pipe(
      map((r: StrictHttpResponse<Playlist>): Playlist => r.body)
    );
  }

  /** Path part for operation `findOnePlaylist()` */
  static readonly FindOnePlaylistPath = '/playlists/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findOnePlaylist()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOnePlaylist$Response(params: FindOnePlaylist$Params, context?: HttpContext): Observable<StrictHttpResponse<Playlist>> {
    return findOnePlaylist(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findOnePlaylist$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOnePlaylist(params: FindOnePlaylist$Params, context?: HttpContext): Observable<Playlist> {
    return this.findOnePlaylist$Response(params, context).pipe(
      map((r: StrictHttpResponse<Playlist>): Playlist => r.body)
    );
  }

  /** Path part for operation `deletePlaylist()` */
  static readonly DeletePlaylistPath = '/playlists/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deletePlaylist()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePlaylist$Response(params: DeletePlaylist$Params, context?: HttpContext): Observable<StrictHttpResponse<Playlist>> {
    return deletePlaylist(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deletePlaylist$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePlaylist(params: DeletePlaylist$Params, context?: HttpContext): Observable<Playlist> {
    return this.deletePlaylist$Response(params, context).pipe(
      map((r: StrictHttpResponse<Playlist>): Playlist => r.body)
    );
  }

  /** Path part for operation `updatePlaylist()` */
  static readonly UpdatePlaylistPath = '/playlists/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePlaylist()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePlaylist$Response(params: UpdatePlaylist$Params, context?: HttpContext): Observable<StrictHttpResponse<Playlist>> {
    return updatePlaylist(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updatePlaylist$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePlaylist(params: UpdatePlaylist$Params, context?: HttpContext): Observable<Playlist> {
    return this.updatePlaylist$Response(params, context).pipe(
      map((r: StrictHttpResponse<Playlist>): Playlist => r.body)
    );
  }

}
