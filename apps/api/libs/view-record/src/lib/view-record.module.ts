import { Module } from '@nestjs/common';
import { ViewRecordController } from './view-record.controller';
import { ViewRecordService } from './view-record.service';
import { DatabaseModule } from '@cs/shared';

@Module({
  controllers: [ViewRecordController],
  providers: [ViewRecordService],
  exports: [],
  imports: [DatabaseModule],
})
export class ViewRecordModule {}
