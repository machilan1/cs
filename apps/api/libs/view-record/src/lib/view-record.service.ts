import { PG_CONNECTION } from '@cs/shared';
import { Inject, Injectable } from '@nestjs/common';
import * as schema from '@cs/shared';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { ViewRecord } from './entities/view-record.entity';
import { CreateViewRecordDto } from './dtos/create-view-record.dto';
import { eq } from 'drizzle-orm';
import { UpdateViewRecordDto } from './dtos/update-view-record.dto';

@Injectable()
export class ViewRecordService {
  constructor(
    @Inject(PG_CONNECTION) private conn: NodePgDatabase<typeof schema>
  ) {}

  create(createViewRecordDto: CreateViewRecordDto): Promise<ViewRecord[]> {
    return this.conn
      .insert(schema.viewRecord)
      .values(createViewRecordDto)
      .returning();
  }

  findAll(): Promise<ViewRecord[]> {
    return this.conn.select().from(schema.viewRecord);
  }

  findOneById(viewRecordId: number): Promise<ViewRecord[]> {
    return this.conn
      .select()
      .from(schema.viewRecord)
      .where(eq(schema.viewRecord.viewRecordId, viewRecordId));
  }

  update(
    viewRecordId: number,
    updateViewRecordDto: UpdateViewRecordDto
  ): Promise<ViewRecord[]> {
    console.log(viewRecordId);
    console.log(updateViewRecordDto);
    return this.conn
      .update(schema.viewRecord)
      .set(updateViewRecordDto)
      .where(eq(schema.viewRecord.viewRecordId, viewRecordId))
      .returning();
  }

  delete(viewRecordId: number): Promise<ViewRecord[]> {
    return this.conn
      .delete(schema.viewRecord)
      .where(eq(schema.viewRecord.viewRecordId, viewRecordId))
      .returning();
  }
}
