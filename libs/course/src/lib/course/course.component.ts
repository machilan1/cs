import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'cs-course',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="w-full flex justify-end pt-8">
      @if (inPlaylist() === false) {
        <button
          class="px-4 py-1 bg-black text-white rounded-md text-sm"
          (click)="addToPlaylist()"
        >
          加入播放清單
        </button>
      } @else {
        <button
          class="px-4 py-1 bg-black text-white rounded-md text-sm"
          (click)="removeFromPlaylist()"
        >
          從播放清單移除
        </button>
      }
    </div>
    <div class="w-full h-full grid grid-cols-[5fr_1fr] gap-8 pt-4">
      <div>
        <img class="w-full aspect-video rounded-md" />
        <div class="text-lg font-semibold pt-4">course name</div>
        <div class="text-base line-clamp-3">course description</div>
        <div class="text-base">course teacher</div>
      </div>
      <div class="border rounded-md px-4 py-2 flex flex-col">
        <div>課程介紹</div>
        <!-- @for() {
      <div class="text-sm pt-2">影片</div>
    } -->
        <a class="text-sm pt-2" routerLink="/course-detail">影片</a>
        <a class="text-sm pt-2" routerLink="/course-detail">影片</a>
        <a class="text-sm pt-2" routerLink="/course-detail">影片</a>
        <a class="text-sm pt-2" routerLink="/course-detail">影片</a>
        <a class="text-sm pt-2" routerLink="/course-detail">影片</a>
      </div>
    </div>
  `,
  styles: [``],
})
export class CourseComponent {
  inPlaylist = signal(false);

  addToPlaylist() {
    this.inPlaylist.set(true);
    alert('已成功加入播放清單');
  }

  removeFromPlaylist() {
    this.inPlaylist.set(false);
    alert('已成功從播放清單移除');
  }
}
