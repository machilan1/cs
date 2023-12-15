import { Injectable, inject } from '@angular/core';

import { injectMutation, injectQuery, injectQueryClient } from '@ngneat/query';
import { CreateCourseDto } from 'libs/shared/src/lib/models/create-course-dto';
import { UpdateCourseDto } from 'libs/shared/src/lib/models/update-course-dto';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { CoursesService } from 'libs/shared/src/lib/services/courses.service';
import { VideosService } from 'libs/shared/src/lib';

@Injectable({ providedIn: 'root' })
export class CourseStateService {
  #query = injectQuery();
  #mutation = injectMutation();
  #client = injectQueryClient();
  #courseService = inject(CoursesService);
  #videoService = inject(VideosService);

  getCourses() {
    return this.#query({
      queryKey: ['courses'],
      queryFn: () => this.#courseService.getCourses(),
    });
  }

  getCourseById(id: number) {
    return this.#query({
      queryKey: ['course', id],
      queryFn: () => this.#courseService.getCourseById({ id }),
    });
  }

  getCourseVideos(courseId: number) {
    return this.#query({
      queryKey: ['course', courseId, 'videos'],
      queryFn: () =>
        this.#videoService.findVideos({
          courseId,
        }),
      enabled: !!courseId,
    });
  }

  createCourse(body: CreateCourseDto) {
    return this.#mutation({
      mutationFn: () => this.#courseService.createCourse({ body }),
    });
  }

  updateCourse(id: number, body: UpdateCourseDto) {
    return this.#mutation({
      mutationFn: () => this.#courseService.updateCourse({ id, body }),
    });
  }

  deleteCourse(id: number) {
    return this.#mutation({
      mutationFn: () => this.#courseService.deleteCourse({ id }),
    });
  }
}
