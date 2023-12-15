import { Component, inject } from '@angular/core';
import { CourseCardComponent } from '@cs/course';
import { StudentStateService } from './services/student-state.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'cs-student-favorites',
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
  providers: [StudentStateService],
})
export class StudentFavoritesComponent {
  #studentStateService = inject(StudentStateService);

  favoritesSignal = this.#studentStateService.getFavorites().result;
  favoritesInfo = this.favoritesSignal().data;
}
