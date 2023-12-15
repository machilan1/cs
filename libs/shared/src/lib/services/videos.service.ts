/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createVideo } from '../fn/videos/create-video';
import { CreateVideo$Params } from '../fn/videos/create-video';
import { findOneVideo } from '../fn/videos/find-one-video';
import { FindOneVideo$Params } from '../fn/videos/find-one-video';
import { findVideos } from '../fn/videos/find-videos';
import { FindVideos$Params } from '../fn/videos/find-videos';
import { updateVideo } from '../fn/videos/update-video';
import { UpdateVideo$Params } from '../fn/videos/update-video';
import { User } from '../models/user';
import { Video } from '../models/video';
import { videosControllerDeleteVideo } from '../fn/videos/videos-controller-delete-video';
import { VideosControllerDeleteVideo$Params } from '../fn/videos/videos-controller-delete-video';
import { videosControllerGetStudentsByVideoId } from '../fn/videos/videos-controller-get-students-by-video-id';
import { VideosControllerGetStudentsByVideoId$Params } from '../fn/videos/videos-controller-get-students-by-video-id';

@Injectable({ providedIn: 'root' })
export class VideosService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findVideos()` */
  static readonly FindVideosPath = '/videos';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findVideos()` instead.
   *
   * This method doesn't expect any request body.
   */
  findVideos$Response(params?: FindVideos$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Video>>> {
    return findVideos(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findVideos$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findVideos(params?: FindVideos$Params, context?: HttpContext): Observable<Array<Video>> {
    return this.findVideos$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Video>>): Array<Video> => r.body)
    );
  }

  /** Path part for operation `createVideo()` */
  static readonly CreateVideoPath = '/videos';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createVideo()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createVideo$Response(params: CreateVideo$Params, context?: HttpContext): Observable<StrictHttpResponse<Video>> {
    return createVideo(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createVideo$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createVideo(params: CreateVideo$Params, context?: HttpContext): Observable<Video> {
    return this.createVideo$Response(params, context).pipe(
      map((r: StrictHttpResponse<Video>): Video => r.body)
    );
  }

  /** Path part for operation `findOneVideo()` */
  static readonly FindOneVideoPath = '/videos/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findOneVideo()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOneVideo$Response(params: FindOneVideo$Params, context?: HttpContext): Observable<StrictHttpResponse<Video>> {
    return findOneVideo(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findOneVideo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findOneVideo(params: FindOneVideo$Params, context?: HttpContext): Observable<Video> {
    return this.findOneVideo$Response(params, context).pipe(
      map((r: StrictHttpResponse<Video>): Video => r.body)
    );
  }

  /** Path part for operation `videosControllerDeleteVideo()` */
  static readonly VideosControllerDeleteVideoPath = '/videos/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `videosControllerDeleteVideo()` instead.
   *
   * This method doesn't expect any request body.
   */
  videosControllerDeleteVideo$Response(params: VideosControllerDeleteVideo$Params, context?: HttpContext): Observable<StrictHttpResponse<Video>> {
    return videosControllerDeleteVideo(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `videosControllerDeleteVideo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  videosControllerDeleteVideo(params: VideosControllerDeleteVideo$Params, context?: HttpContext): Observable<Video> {
    return this.videosControllerDeleteVideo$Response(params, context).pipe(
      map((r: StrictHttpResponse<Video>): Video => r.body)
    );
  }

  /** Path part for operation `updateVideo()` */
  static readonly UpdateVideoPath = '/videos/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateVideo()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateVideo$Response(params: UpdateVideo$Params, context?: HttpContext): Observable<StrictHttpResponse<Video>> {
    return updateVideo(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateVideo$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateVideo(params: UpdateVideo$Params, context?: HttpContext): Observable<Video> {
    return this.updateVideo$Response(params, context).pipe(
      map((r: StrictHttpResponse<Video>): Video => r.body)
    );
  }

  /** Path part for operation `videosControllerGetStudentsByVideoId()` */
  static readonly VideosControllerGetStudentsByVideoIdPath = '/videos/{id}/students';

  /**
   * 讀取所有看過特定一支影片的學生.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `videosControllerGetStudentsByVideoId()` instead.
   *
   * This method doesn't expect any request body.
   */
  videosControllerGetStudentsByVideoId$Response(params: VideosControllerGetStudentsByVideoId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<User>>> {
    return videosControllerGetStudentsByVideoId(this.http, this.rootUrl, params, context);
  }

  /**
   * 讀取所有看過特定一支影片的學生.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `videosControllerGetStudentsByVideoId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  videosControllerGetStudentsByVideoId(params: VideosControllerGetStudentsByVideoId$Params, context?: HttpContext): Observable<Array<User>> {
    return this.videosControllerGetStudentsByVideoId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<User>>): Array<User> => r.body)
    );
  }

}
