import { video } from './../../../../../apps/api/libs/shared/src/lib/drizzle/schema';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component, DestroyRef } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CourseEditComponent } from './course-edit-dialog.component';
import { EditDialogResult } from './models/edit-dialog-result.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'cs-teacher-course-edit',
  standalone: true,
  template: `
    <form
      [formGroup]="form"
      (submit)="submit()"
      class="flex flex-col gap-4 pt-4"
    >
      <div class="w-full flex justify-end gap-2">
        <button
          class="px-4 py-1 bg-black text-white rounded-md text-sm"
          type="submit"
        >
          儲存
        </button>
        <button class="px-4 py-1 border text-red-500 rounded-md text-sm">
          刪除
        </button>
      </div>
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
        <label for="image" class="w-20">課程圖片</label>
        <input
          id="image"
          formControlName="image"
          class="border rounded-md w-full p-2"
          type="file"
          accept="image/gif, image/jpeg, image/png"
        />
      </div>
      <div class="flex gap-8">
        <label for="description" class="w-20">課程介紹</label>
        <textarea
          rows="5"
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
          <ng-container formArrayName="videos">
            @for (
              videosForm of videosFormArray.controls;
              track videosForm;
              let i = $index
            ) {
              <div class="flex justify-between pt-2" [formGroupName]="i">
                <input formControlName="title" type="text" />
                <div class="flex gap-4">
                  <button
                    type="button"
                    class="px-4 text-sm"
                    (click)="openDialog(videosForm)"
                  >
                    編輯
                  </button>
                </div>
              </div>
            }
          </ng-container>

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
    image: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    videos: new FormArray<FormGroup>([]),
  });

  constructor(
    public dialog: MatDialog,
    private destroyRef: DestroyRef,
  ) {}

  get videosFormArray() {
    return this.form.controls['videos'];
  }

  submit() {
    if (this.form.invalid) {
      alert('資料有誤，請重新輸入');
      return;
    }
  }

  openDialog(videosForm?: FormGroup) {
    const dialogRef = this.dialog.open(CourseEditComponent, {
      height: '200px',
      width: '400px',
      data: videosForm?.value,
    });

    if (!videosForm) {
      dialogRef
        .afterClosed()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((result: EditDialogResult) => {
          const fg = this.createVideoGroup(result);
          this.addVideoGroup(fg);
        });
    }
  }

  createVideoGroup(params?: { title: string; upload: File }) {
    return new FormGroup({
      title: new FormControl(params?.title ?? '', [Validators.required]),
      upload: new FormControl(params?.upload ?? '', [Validators.required]),
    });
  }

  addVideoGroup(formGroup: FormGroup) {
    this.videosFormArray.push(formGroup);
  }
}
