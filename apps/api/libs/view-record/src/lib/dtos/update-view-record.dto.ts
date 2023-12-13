import { PartialType, PickType } from '@nestjs/swagger';
import { CreateViewRecordDto } from './create-view-record.dto';

export class UpdateViewRecordDto extends PickType(CreateViewRecordDto, [
  'videoTimeAnchor',
] as const) {}
