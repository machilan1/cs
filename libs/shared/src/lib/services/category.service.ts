/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { Category } from '../models/category';
import { createCategory } from '../fn/category/create-category';
import { CreateCategory$Params } from '../fn/category/create-category';
import { deleteCategory } from '../fn/category/delete-category';
import { DeleteCategory$Params } from '../fn/category/delete-category';
import { findCategories } from '../fn/category/find-categories';
import { FindCategories$Params } from '../fn/category/find-categories';
import { findCategory } from '../fn/category/find-category';
import { FindCategory$Params } from '../fn/category/find-category';

@Injectable({ providedIn: 'root' })
export class CategoryService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findCategories()` */
  static readonly FindCategoriesPath = '/category';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findCategories()` instead.
   *
   * This method doesn't expect any request body.
   */
  findCategories$Response(params?: FindCategories$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Category>>> {
    return findCategories(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findCategories$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findCategories(params?: FindCategories$Params, context?: HttpContext): Observable<Array<Category>> {
    return this.findCategories$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Category>>): Array<Category> => r.body)
    );
  }

  /** Path part for operation `createCategory()` */
  static readonly CreateCategoryPath = '/category';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createCategory()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createCategory$Response(params: CreateCategory$Params, context?: HttpContext): Observable<StrictHttpResponse<Category>> {
    return createCategory(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createCategory$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createCategory(params: CreateCategory$Params, context?: HttpContext): Observable<Category> {
    return this.createCategory$Response(params, context).pipe(
      map((r: StrictHttpResponse<Category>): Category => r.body)
    );
  }

  /** Path part for operation `deleteCategory()` */
  static readonly DeleteCategoryPath = '/category/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteCategory()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCategory$Response(params: DeleteCategory$Params, context?: HttpContext): Observable<StrictHttpResponse<Category>> {
    return deleteCategory(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteCategory$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCategory(params: DeleteCategory$Params, context?: HttpContext): Observable<Category> {
    return this.deleteCategory$Response(params, context).pipe(
      map((r: StrictHttpResponse<Category>): Category => r.body)
    );
  }

  /** Path part for operation `findCategory()` */
  static readonly FindCategoryPath = '/category/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findCategory()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  findCategory$Response(params: FindCategory$Params, context?: HttpContext): Observable<StrictHttpResponse<Category>> {
    return findCategory(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findCategory$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  findCategory(params: FindCategory$Params, context?: HttpContext): Observable<Category> {
    return this.findCategory$Response(params, context).pipe(
      map((r: StrictHttpResponse<Category>): Category => r.body)
    );
  }

}
