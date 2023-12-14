import { RouterLink } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'cs-teacher-course-detail',
  standalone: true,
  template: `
    <div class="w-full flex justify-end">
      <button
        class="px-4 py-1 bg-black text-white rounded-md text-sm"
        routerLink="/teacher-course-edit"
      >
        編輯
      </button>
    </div>
    <div class="w-full h-full grid grid-cols-[5fr_1fr] gap-8 pt-4">
      <div>
        <img class="w-full aspect-video rounded-md" />
        <div class="py-4 text-lg font-semibold">課程名稱</div>
        <div
          class="w-full border rounded-md px-4 py-2 flex justify-between items-center"
        >
          <div>影片1</div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="14"
              viewBox="0 0 448 512"
            >
              <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->
              <path
                d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div class="border rounded-md px-4 py-2">
        <div>已觀看學生</div>
        <!-- @for() {
      <div class="text-sm pt-2">影片</div>
    } -->
        <div class="text-sm pt-1">學生</div>
        <div class="text-sm pt-1">學生</div>
        <div class="text-sm pt-1">學生</div>
        <div class="text-sm pt-1">學生</div>
        <div class="text-sm pt-1">學生</div>
      </div>
    </div>
  `,
  styles: [``],
  imports: [RouterLink],
})
export class TeacherCourseDetailComponent {}
