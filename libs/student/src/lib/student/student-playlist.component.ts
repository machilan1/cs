import { Component, inject } from '@angular/core';
import { CourseCardComponent } from '@cs/course';
import { StudentStateService } from './services/student-state.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'cs-student-playlist',
  standalone: true,
  template: `
    <pre>{{ playlistInfo | json }}</pre>
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
  providers: [StudentStateService],
})
export class StudentPlaylistComponent {
  #studentStateService = inject(StudentStateService);

  playlistSignal = this.#studentStateService.getPlaylists().result;
  playlistInfo = this.playlistSignal().data;
}
