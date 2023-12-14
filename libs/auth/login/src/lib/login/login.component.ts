import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'cs-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="w-full h-screen flex justify-center items-center">
      <form
        [formGroup]="form"
        (submit)="submit()"
        class="border rounded-md px-20 py-12 w-1/2"
      >
        <div class="text-2xl font-semibold text-center">登入</div>

        <div class="flex flex-col gap-4 pt-2">
          <input
            type="email"
            class="border rounded-md p-2"
            placeholder="請輸入信箱"
            formControlName="email"
          />
          <input
            type="text"
            class="border rounded-md p-2"
            placeholder="請輸入密碼"
            formControlName="password"
          />

          <div class="w-full flex justify-center">
            <button
              type="submit"
              class="bg-black w-fit text-white rounded-md px-12 py-1 hover:bg-gray-700"
            >
              登入
            </button>
          </div>
          <a
            class="flex gap-2 items-center justify-center"
            routerLink="/register"
          >
            <div class="text-sm text-gray-500">尚未擁有帳號嗎？前往註冊</div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="14"
                viewBox="0 0 448 512"
              >
                <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->
                <path
                  d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
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
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  submit() {
    if (this.form.invalid) {
      alert('資料錯誤，請重新輸入');
      return;
    }
    console.log(this.form.value);
  }
}
