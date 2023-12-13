import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'cs-course-edit',
  standalone: true,
  template: `
    <mat-dialog-content class="mat-typography">
      <form [formGroup]="form" (submit)="submit()">
        <div class="flex gap-8">
          <label for="title" class="w-20">影片標題</label>
          <input
            type="text"
            id="title"
            formControlName="title"
            class="border rounded-md w-full"
          />
        </div>
        <div class="flex gap-8">
          <label for="upload" class="w-20">檔案上傳</label>
          <input
            type="file"
            id="upload"
            formControlName="upload"
            class="border rounded-md w-full"
          />
        </div>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="center">
      <button mat-stroked-button mat-dialog-close>取消</button>
      <button mat-stroked-button [mat-dialog-close]="true" cdkFocusInitial>
        新增
      </button>
    </mat-dialog-actions>
  `,
  styles: [``],
  imports: [MatDialogModule, MatButtonModule, ReactiveFormsModule],
})
export class CourseEditComponent {
  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    upload: new FormControl('', [Validators.required]),
  });

  submit() {
    console.log(this.form.value);
  }
}
