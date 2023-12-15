import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CourseCardComponent } from '@cs/course';
import { TeacherStateService } from 'libs/teacher/services/teacher-state.service';

@Component({
  selector: 'cs-teacher-history',
  standalone: true,
  template: `
    <pre>{{ historyInfo | json }}</pre>
    <div class="">歷史紀錄</div>
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
export class TeacherHistoryComponent {
  #teacherStateService = inject(TeacherStateService);

  historySignal = this.#teacherStateService.getHistory().result;
  historyInfo = this.historySignal().data;
}
