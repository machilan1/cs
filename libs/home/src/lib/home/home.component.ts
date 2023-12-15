import { CategoryStateService } from './category-state.service';

import { CourseStateService } from '../../../../course/src/lib/course/services/course-state.service';

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCardComponent } from '@cs/course';
import { inet } from 'drizzle-orm/pg-core';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'cs-home',
  standalone: true,
  imports: [CommonModule, CourseCardComponent, RouterLinkActive],
  template: `
    <div>
      <div class="w-full flex justify-center py-2 gap-4 border-b">
        @if (categoriesSignal().isLoading) {
          <!-- TODO: -->
          <p>Loading...</p>
        }
        @if (categoriesSignal().isSuccess) {
          @for (category of categoriesSignal().data; track category.name) {
            <p class="cursor-pointer">
              {{ category.name }}
            </p>
          } @empty {
            <p class="cursor-pointer">No category</p>
          }
        }
        @if (categoriesSignal().isError) {
          <!-- TODO: -->
          <p>Error</p>
        }
      </div>
      <div>
        <div class="flex flex-col gap-12 pt-12">
          <div>
            <div class="text-xl font-semibold">course category</div>
            <div class="w-full grid grid-cols-3 gap-8 pt-4">
              @if (coursesSignal().isLoading) {
                <!-- TODO: -->
                <p>Loading...</p>
              }
              @if (coursesSignal().isSuccess) {
                @for (course of coursesSignal().data; track course.name) {
                  <cs-course-card
                    [course]="course"
                    [id]="course.courseId"
                  ></cs-course-card>
                } @empty {
                  <p class="cursor-pointer">No courses</p>
                }
              }
              @if (coursesSignal().isError) {
                <!-- TODO: -->
                <p>Error</p>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [``],
  providers: [CourseStateService],
})
export class HomeComponent {
  #courseStateService = inject(CourseStateService);
  #categoryService = inject(CategoryStateService);

  courses = this.#courseStateService.getCourses();
  coursesSignal = this.courses.result;

  categories = this.#categoryService.getCategories();
  categoriesSignal = this.categories.result;
}
