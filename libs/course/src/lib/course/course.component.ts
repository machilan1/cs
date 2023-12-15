import {
  Component,
  Injector,
  Input,
  inject,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseStateService } from './services/course-state.service';

@Component({
  selector: 'cs-course',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    @if (courseSignal !== undefined && videosSignal !== undefined) {
      @if (courseSignal().isLoading) {
        loading...
      }
      @if (courseSignal().isSuccess) {
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
            <div class="text-lg font-semibold pt-4">
              {{ courseSignal().data?.name }}
            </div>
            <div class="text-base line-clamp-3">
              {{ courseSignal().data?.description }}
            </div>
            <div class="text-base">
              {{ courseSignal().data?.teacher?.name }}
            </div>
          </div>
          <div class="border rounded-md px-4 py-2 flex flex-col">
            <div>課程介紹</div>

            @for (video of videosSignal().data; track video.name) {
              <a
                class="text-sm pt-2"
                [routerLink]="
                  '/course/' + courseSignal().data?.courseId + '/detail'
                "
                >{{ video.name }}</a
              >
            }
          </div>
        </div>
      }
      @if (courseSignal().isError) {
        error
      }
    }
  `,
  styles: [``],
})
export class CourseComponent {
  #route = inject(ActivatedRoute);
  #courseStateService = inject(CourseStateService);
  #injector = inject(Injector);

  inPlaylist = signal(false);

  courseSignal!: ReturnType<CourseStateService['getCourseById']>['result'];
  videosSignal!: ReturnType<CourseStateService['getCourseVideos']>['result'];

  @Input()
  set courseId(courseId: string) {
    runInInjectionContext(this.#injector, () => {
      this.courseSignal = this.#courseStateService.getCourseById(
        Number(courseId),
      ).result;
      this.videosSignal = this.#courseStateService.getCourseVideos(
        Number(courseId),
      ).result;
    });
  }

  addToPlaylist() {
    this.inPlaylist.set(true);
    alert('已成功加入播放清單');
  }

  removeFromPlaylist() {
    this.inPlaylist.set(false);
    alert('已成功從播放清單移除');
  }
}
