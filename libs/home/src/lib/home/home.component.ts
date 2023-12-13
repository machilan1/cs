import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCardComponent } from '@cs/course';

@Component({
  selector: 'cs-home',
  standalone: true,
  imports: [CommonModule, CourseCardComponent],
  template: `
    <div>
      <div class="w-full flex justify-center py-2 gap-4 border-b">
        <!-- @for() {
        category
      } -->
        <p class="cursor-pointer">category</p>
        <p>category</p>
        <p>category</p>
        <p>category</p>
      </div>
      <div>
        <div class="flex flex-col gap-12 pt-12">
          <div>
            <div class="text-xl font-semibold">course category</div>
            <div class="w-full grid grid-cols-3 gap-8 pt-4">
              <cs-course-card></cs-course-card>
              <cs-course-card></cs-course-card>
              <cs-course-card></cs-course-card>
            </div>
          </div>

          <div>
            <div class="text-xl font-semibold pt-4">course category</div>
            <div class="w-full grid grid-cols-3 gap-8 pt-4">
              <cs-course-card></cs-course-card>
              <cs-course-card></cs-course-card>
              <cs-course-card></cs-course-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [``],
})
export class HomeComponent {}
