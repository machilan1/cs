import { InsertVideo } from '@cs/shared';

export class UpdateVideoDto implements Partial<InsertVideo> {
  name!: string;
  length!: string;
  description!: string;
  fileLink!: string;
}
