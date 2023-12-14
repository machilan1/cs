/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { Course } from '../models/course';
import { CourseWithCategoryTeacher } from '../models/course-with-category-teacher';
import { createCourse } from '../fn/courses/create-course';
import { CreateCourse$Params } from '../fn/courses/create-course';
import { deleteCourse } from '../fn/courses/delete-course';
import { DeleteCourse$Params } from '../fn/courses/delete-course';
import { getCourseById } from '../fn/courses/get-course-by-id';
import { GetCourseById$Params } from '../fn/courses/get-course-by-id';
import { getCourses } from '../fn/courses/get-courses';
import { GetCourses$Params } from '../fn/courses/get-courses';
import { updateCourse } from '../fn/courses/update-course';
import { UpdateCourse$Params } from '../fn/courses/update-course';

@Injectable({ providedIn: 'root' })
export class CoursesService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getCourses()` */
  static readonly GetCoursesPath = '/courses';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCourses()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCourses$Response(params?: GetCourses$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CourseWithCategoryTeacher>>> {
    return getCourses(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCourses$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCourses(params?: GetCourses$Params, context?: HttpContext): Observable<Array<CourseWithCategoryTeacher>> {
    return this.getCourses$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CourseWithCategoryTeacher>>): Array<CourseWithCategoryTeacher> => r.body)
    );
  }

  /** Path part for operation `createCourse()` */
  static readonly CreateCoursePath = '/courses';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createCourse()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createCourse$Response(params: CreateCourse$Params, context?: HttpContext): Observable<StrictHttpResponse<Course>> {
    return createCourse(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createCourse$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createCourse(params: CreateCourse$Params, context?: HttpContext): Observable<Course> {
    return this.createCourse$Response(params, context).pipe(
      map((r: StrictHttpResponse<Course>): Course => r.body)
    );
  }

  /** Path part for operation `getCourseById()` */
  static readonly GetCourseByIdPath = '/courses/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCourseById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCourseById$Response(params: GetCourseById$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CourseWithCategoryTeacher>>> {
    return getCourseById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCourseById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCourseById(params: GetCourseById$Params, context?: HttpContext): Observable<Array<CourseWithCategoryTeacher>> {
    return this.getCourseById$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CourseWithCategoryTeacher>>): Array<CourseWithCategoryTeacher> => r.body)
    );
  }

  /** Path part for operation `deleteCourse()` */
  static readonly DeleteCoursePath = '/courses/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteCourse()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCourse$Response(params: DeleteCourse$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Course>>> {
    return deleteCourse(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteCourse$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCourse(params: DeleteCourse$Params, context?: HttpContext): Observable<Array<Course>> {
    return this.deleteCourse$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Course>>): Array<Course> => r.body)
    );
  }

  /** Path part for operation `updateCourse()` */
  static readonly UpdateCoursePath = '/courses/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateCourse()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCourse$Response(params: UpdateCourse$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Course>>> {
    return updateCourse(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateCourse$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCourse(params: UpdateCourse$Params, context?: HttpContext): Observable<Array<Course>> {
    return this.updateCourse$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Course>>): Array<Course> => r.body)
    );
  }

}
