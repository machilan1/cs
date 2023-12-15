import { JsonPipe } from '@angular/common';
import { TeacherStateService } from './../../../services/teacher-state.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'cs-teacher-account',
  standalone: true,
  template: `
    <pre>{{ teacherInfo | json }}</pre>
    <div>教師名稱</div>
    <div>帳號</div>
    <div>密碼</div>
  `,
  styles: [``],
  imports: [JsonPipe],
})
export class TeacherAccountComponent {
  #teacherStateService = inject(TeacherStateService);

  teacherSignal = this.#teacherStateService.getAccount(1).result;
  teacherInfo = this.teacherSignal().data;
}
