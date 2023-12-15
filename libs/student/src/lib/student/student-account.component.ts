import { Component, inject } from '@angular/core';
import { StudentStateService } from './services/student-state.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'cs-student-account',
  standalone: true,
  template: `
    <pre>{{ accountInfo | json }}</pre>
    <div>學生名稱</div>
    <div>帳號</div>
    <div>密碼</div>
  `,
  styles: [``],
  imports: [JsonPipe],
  providers: [StudentStateService],
})
export class StudentAccountComponent {
  #studentStateService = inject(StudentStateService);

  accountSignal = this.#studentStateService.getAccount(1).result;
  accountInfo = this.accountSignal().data;
}
