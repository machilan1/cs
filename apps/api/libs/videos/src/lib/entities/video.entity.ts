import { SelectVideo } from '@cs/shared';

export class Video implements SelectVideo {
  videoId!: number;
  name!: string;
  length!: string;
  description!: string;
  createdAt!: Date;
  courseId!: number | null;
}
