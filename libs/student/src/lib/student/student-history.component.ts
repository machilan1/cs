import { Component, inject } from '@angular/core';
import { CourseCardComponent } from '@cs/course';
import { StudentStateService } from './services/student-state.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'cs-student-history',
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
  providers: [StudentStateService],
})
export class StudentHistoryComponent {
  #studentStateService = inject(StudentStateService);

  historySignal = this.#studentStateService.getHistory().result;
  historyInfo = this.historySignal().data;
}
