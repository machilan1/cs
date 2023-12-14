import { Component } from '@angular/core';
import { CourseCardComponent } from '@cs/course';

@Component({
  selector: 'cs-teacher-history',
  standalone: true,
  template: `
    <div class="">歷史紀錄</div>
    <div class="grid grid-cols-4 gap-4 pt-4">
      <!-- @for() {
            <cs-course-card></cs-course-card>
        
        } -->
      <cs-course-card></cs-course-card>
    </div>
  `,
  styles: [``],
  imports: [CourseCardComponent],
})
export class TeacherHistoryComponent {}
