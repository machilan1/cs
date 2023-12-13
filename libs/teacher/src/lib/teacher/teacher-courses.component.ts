import { Component } from '@angular/core';
import { CourseCardComponent } from '@cs/course';

@Component({
  selector: 'cs-teacher-courses',
  standalone: true,
  template: `
    <div class="">我的課程</div>
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
export class TeacherCoursesComponent {}