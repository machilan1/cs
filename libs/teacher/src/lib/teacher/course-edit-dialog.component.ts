import { Component, OnInit, inject } from '@angular/core';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EditDialogResult } from './models/edit-dialog-result.model';

@Component({
  selector: 'cs-course-edit',
  standalone: true,
  template: `
    <mat-dialog-content class="mat-typography">
      <form [formGroup]="form" (submit)="submit()" class="flex flex-col gap-4">
        <div class="flex gap-8">
          <label for="title" class="w-20 text-sm">影片標題</label>
          <input
            type="text"
            id="title"
            formControlName="title"
            class="border rounded-md w-full"
          />
        </div>
        <div class="flex gap-8">
          <label for="upload" class="w-20 text-sm">檔案上傳</label>
          <input
            type="file"
            id="upload"
            formControlName="upload"
            class="border rounded-md w-full p-2"
            value="{this.state.image}"
            onChange="{this.uploadFile}"
          />
        </div>
        <mat-dialog-actions align="center" class="flex gap-4">
          <button
            type="button"
            mat-dialog-close
            class="border px-4 py-1 rounded-md"
            (click)="cancel()"
          >
            取消
          </button>
          <button
            type="submit"
            cdkFocusInitial
            class="border px-4 py-1 rounded-md bg-black text-white"
          >
            新增
          </button>
        </mat-dialog-actions>
      </form>
    </mat-dialog-content>
  `,
  styles: [``],
  imports: [MatDialogModule, ReactiveFormsModule],
})
export class CourseEditComponent {
  #dialogRef = inject(MatDialogRef);
  #data = inject(MAT_DIALOG_DATA);

  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    upload: new FormControl('', [Validators.required]),
  });

  // ngOnInit() {
  //   if (this.#data) {
  //     this.form.setValue({
  //       title: this.#data.title,
  //       upload: this.#data.upload,
  //     });
  //   }
  // }

  submit() {
    if (this.form.invalid) {
      alert('資料有誤，請重新輸入');
      return;
    }
    const res: EditDialogResult = {
      title: this.form.value.title!,
      upload: this.form.value.upload as any,
    };
    this.#dialogRef.close(res);
  }

  cancel() {
    this.#dialogRef.close();
  }
}
