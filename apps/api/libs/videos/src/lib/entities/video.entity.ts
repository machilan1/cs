import { SelectVideo } from '@cs/shared';

export class Video implements Partial<SelectVideo> {
  fileLink!: string;
  videoId!: number;
  name!: string;
  length!: string;
  description!: string;
  createdAt!: Date;
  courseId!: number | null;
}
