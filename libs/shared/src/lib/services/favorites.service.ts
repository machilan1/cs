/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addToFavorite } from '../fn/favorites/add-to-favorite';
import { AddToFavorite$Params } from '../fn/favorites/add-to-favorite';
import { Favorite } from '../models/favorite';
import { favoritesControllerDelete } from '../fn/favorites/favorites-controller-delete';
import { FavoritesControllerDelete$Params } from '../fn/favorites/favorites-controller-delete';
import { getFavorite } from '../fn/favorites/get-favorite';
import { GetFavorite$Params } from '../fn/favorites/get-favorite';

@Injectable({ providedIn: 'root' })
export class FavoritesService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getFavorite()` */
  static readonly GetFavoritePath = '/favorites';

  /**
   * Retrieve favorites.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFavorite()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFavorite$Response(params?: GetFavorite$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Favorite>>> {
    return getFavorite(this.http, this.rootUrl, params, context);
  }

  /**
   * Retrieve favorites.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getFavorite$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFavorite(params?: GetFavorite$Params, context?: HttpContext): Observable<Array<Favorite>> {
    return this.getFavorite$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Favorite>>): Array<Favorite> => r.body)
    );
  }

  /** Path part for operation `addToFavorite()` */
  static readonly AddToFavoritePath = '/favorites';

  /**
   * Add favorite with video id and user id.
   *
   * Add a video to favorite list for a user
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addToFavorite()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addToFavorite$Response(params: AddToFavorite$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Favorite>>> {
    return addToFavorite(this.http, this.rootUrl, params, context);
  }

  /**
   * Add favorite with video id and user id.
   *
   * Add a video to favorite list for a user
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addToFavorite$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addToFavorite(params: AddToFavorite$Params, context?: HttpContext): Observable<Array<Favorite>> {
    return this.addToFavorite$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Favorite>>): Array<Favorite> => r.body)
    );
  }

  /** Path part for operation `favoritesControllerDelete()` */
  static readonly FavoritesControllerDeletePath = '/favorites/{id}';

  /**
   * Remove favorite with id.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `favoritesControllerDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  favoritesControllerDelete$Response(params: FavoritesControllerDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Favorite>>> {
    return favoritesControllerDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * Remove favorite with id.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `favoritesControllerDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  favoritesControllerDelete(params: FavoritesControllerDelete$Params, context?: HttpContext): Observable<Array<Favorite>> {
    return this.favoritesControllerDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Favorite>>): Array<Favorite> => r.body)
    );
  }

}
