import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CourseCardComponent } from '@cs/course';
import { TeacherStateService } from 'libs/teacher/services/teacher-state.service';

@Component({
  selector: 'cs-teacher-playlist',
  standalone: true,
  template: `
    <pre>{{ playlistsInfo | json }}</pre>
    <div class="">播放清單</div>
    <div class="grid grid-cols-4 gap-4 pt-4">
      <!-- @for() {
            <cs-course-card></cs-course-card>
        
        } -->
      <!-- <cs-course-card></cs-course-card> -->
    </div>
  `,
  styles: [``],
  imports: [CourseCardComponent, JsonPipe],
  providers: [TeacherStateService],
})
export class TeacherPlaylistComponent {
  #teacherStateService = inject(TeacherStateService);

  playlistsSignal = this.#teacherStateService.getPlaylists().result;
  playlistsInfo = this.playlistsSignal().data;
}
