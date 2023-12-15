import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'cs-course-card',
  template: `
    <a
      class="w-full border rounded-md px-6 py-4 block"
      [routerLink]="'/course/' + id"
    >
      <img class="w-full aspect-video rounded-md" />
      <div class="text-lg font-semibold pt-2">{{ course.name }}e</div>
      <div class="text-base line-clamp-3">{{ course.description }}</div>
    </a>
  `,
  styles: [``],
  standalone: true,
  imports: [RouterLink],
})
export class CourseCardComponent {
  @Input({ required: true }) id!: any;
  @Input({ required: true }) course!: any;
}
