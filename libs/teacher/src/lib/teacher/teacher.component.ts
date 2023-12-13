import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'cs-teacher',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: ` <a class="flex gap-2 items-center pt-8" routerLink="/">
      <div routerLink="/course">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="16"
          width="14"
          viewBox="0 0 448 512"
        >
          <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->
          <path
            d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
          />
        </svg>
      </div>
      <div>返回課程列表</div>
    </a>
    <div class="w-full h-full grid grid-cols-[1fr_5fr] pt-6">
      <div class="w-full h-full border-r p-4 text-center flex flex-col">
        <a routerLink="/teacher" class="active:underline hover:underline"
          >帳號資訊</a
        >
        <a routerLink="favorites" class="active:underline hover:underline"
          >我的最愛</a
        >
        <a routerLink="history" class="active:underline hover:underline"
          >歷史數據</a
        >
        <a routerLink="playlist" class="active:underline hover:underline"
          >播放清單</a
        >
        <a routerLink="courses" class="active:underline hover:underline"
          >我的課程</a
        >
      </div>
      <div class="w-full h-full px-8 py-4">
        <router-outlet></router-outlet>
      </div>
    </div>`,
  styles: [``],
})
export class TeacherComponent {}
