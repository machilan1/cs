/* eslint-disable @typescript-eslint/no-explicit-any */
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata) {
    // "value" is an object containing the file's attributes and metadata
    const hundredMbs = 1000 * 1000 * 100;
    if (!value) {
      return new Error('File not provided');
    }

    return value.size < hundredMbs
      ? value
      : new Error('File size exceeds 100MB');
  }
}
