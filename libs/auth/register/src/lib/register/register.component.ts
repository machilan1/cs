import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthStateService } from 'libs/auth/services/auth.service';

@Component({
  selector: 'cs-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="w-full h-screen flex justify-center items-center">
      <form
        [formGroup]="form"
        (ngSubmit)="submit()"
        class="border rounded-md w-1/2 px-20 py-12"
      >
        <div class="text-2xl font-semibold text-center">註冊</div>

        <div class="flex flex-col gap-4 pt-4">
          <input
            type="text"
            class="border rounded-md p-2"
            placeholder="請輸入信箱"
            formControlName="email"
          />
          <input
            type="text"
            class="border rounded-md p-2"
            placeholder="請輸入姓名"
            formControlName="name"
          />
          <input
            type="text"
            class="border rounded-md p-2"
            placeholder="請輸入密碼"
            formControlName="password"
          />
          <input
            type="text"
            class="border rounded-md p-2"
            placeholder="請再次輸入密碼"
            formControlName="confirm"
          />
          <div class="w-full flex justify-center">
            <button
              type="submit"
              class="bg-black w-fit px-12 py-1 text-white rounded-md hover:bg-gray-700 "
            >
              註冊
            </button>
          </div>
          <a class="flex gap-2 items-center justify-center" routerLink="/login">
            <div class="text-sm text-gray-500">已擁有帳號嗎？前往登入</div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="14"
                viewBox="0 0 448 512"
              >
                <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->
                <path
                  d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
                />
              </svg>
            </div>
          </a>
        </div>
      </form>
    </div>
  `,
  styles: [``],
})
export class RegisterComponent {
  #authStateService = inject(AuthStateService);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirm: new FormControl('', Validators.required),
  });

  async submit() {
    if (this.form.invalid) {
      alert('資料錯誤，請重新輸入');
      return;
    }

    if (this.form.value.password !== this.form.value.confirm) {
      alert('密碼不一致，請重新輸入');
      return;
    }

    alert('註冊中');
    this.#authStateService.register({
      email: this.form.value.email!,
      name: this.form.value.name!,
      password: this.form.value.password!,
    });
    alert('註冊成功');
    console.log(this.form.value);
  }
}
