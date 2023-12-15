import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CourseCardComponent } from '@cs/course';
import { TeacherStateService } from 'libs/teacher/services/teacher-state.service';

@Component({
  selector: 'cs-teacher-favorites',
  standalone: true,
  template: `
    <pre>{{ favoritesInfo | json }}</pre>
    <div class="">我的最愛</div>
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
export class TeacherFavoritesComponent {
  #teacherStateService = inject(TeacherStateService);

  favoritesSignal = this.#teacherStateService.getFavorites().result;
  favoritesInfo = this.favoritesSignal().data;
}
