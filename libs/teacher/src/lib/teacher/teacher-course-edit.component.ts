import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CourseEditComponent } from './course-edit-dialog.component';

@Component({
  selector: 'cs-teacher-course-edit',
  standalone: true,
  template: `
    <div class="w-full flex justify-end gap-2">
      <button class="px-4 py-1 bg-black text-white rounded-md text-sm">
        儲存
      </button>
      <button class="px-4 py-1 border text-red-500 rounded-md text-sm">
        刪除
      </button>
    </div>
    <form
      [formGroup]="form"
      (ngSubmit)="submit()"
      class="flex flex-col gap-4 pt-4"
    >
      <div class="flex gap-8">
        <label for="name" class="w-20">課程名稱</label>
        <input
          type="text"
          id="name"
          formControlName="name"
          class="border rounded-md w-full"
        />
      </div>
      <div class="flex gap-8">
        <label for="description" class="w-20">課程介紹</label>
        <textarea
          id="description"
          formControlName="description"
          class="border rounded-md w-full"
        ></textarea>
      </div>
      <div class="flex gap-8">
        <label for="category" class="w-20">課程類別</label>
        <select
          id="category"
          formControlName="category"
          class="border rounded-md w-full"
        >
          <option value="1">語言</option>
          <option value="2">程式</option>
          <option value="3">數學</option>
        </select>
      </div>
      <div class="flex gap-8">
        <label for="video" class="w-20">課程影片</label>
        <div class="border rounded-md px-4 flex flex-col w-full pb-2">
          <div class="flex justify-between pt-2">
            <div>影片名稱</div>
            <div class="flex gap-4">
              <button class="px-4" (click)="openDialog()">編輯</button>
            </div>
          </div>
          <div class="flex justify-between pt-2">
            <div>影片名稱</div>
            <div class="flex gap-4">
              <button class="px-4" (click)="openDialog()">編輯</button>
            </div>
          </div>
          <div
            class="text-sm text-gray-500 text-center pt-2 cursor-pointer"
            (click)="openDialog()"
          >
            新增影片
          </div>
        </div>
      </div>
    </form>
  `,
  styles: [``],

  imports: [ReactiveFormsModule, MatDialogModule],
})
export class TeacherCourseEditComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
  });

  submit() {
    console.log(this.form.value);
  }

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(CourseEditComponent, {
      height: '200px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
