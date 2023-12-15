import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import {
  bigserial,
  integer,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['guest', 'student', 'teacher']);

export const user = pgTable('users', {
  userId: bigserial('user_id', { mode: 'number' }).primaryKey().notNull(),
  role: roleEnum('role').default('student').notNull(),
  name: varchar('name', { length: 45 }).notNull().unique(),
  email: varchar('email', { length: 45 }).notNull().unique(),
  avatar: varchar('avatar', { length: 255 }),
  password: varchar('password').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type SelectUser = InferSelectModel<typeof user>;
export type InsertUser = InferInsertModel<typeof user>;

export const course = pgTable('course', {
  courseId: bigserial('course_id', { mode: 'number' }).primaryKey().notNull(),
  name: varchar('name', { length: 45 }).notNull(),
  description: varchar('description', { length: 255 }).notNull(),
  thumbnail: varchar('thumbnail', { length: 255 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  teacherId: integer('teacher_id')
    .references(() => user.userId)
    .notNull(),
  categoryId: integer('categoryId')
    .references(() => category.categoryId)
    .notNull(),
});

export type SelectCourse = InferSelectModel<typeof course>;
export type InsertCourse = InferInsertModel<typeof course>;

export const category = pgTable('category', {
  categoryId: bigserial('category_id', { mode: 'number' })
    .primaryKey()
    .notNull(),
  name: varchar('name', { length: 45 }).notNull(),
});

export type SelectCategory = InferSelectModel<typeof category>;
export type InsertCategory = InferInsertModel<typeof category>;

export const video = pgTable('video', {
  videoId: bigserial('video_id', { mode: 'number' }).primaryKey().notNull(),
  name: varchar('name', { length: 45 }).notNull(),
  length: varchar('length', { length: 45 }).notNull(),
  description: varchar('description', { length: 255 }).notNull(),
  fileLink: varchar('file_link', { length: 255 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  courseId: integer('course_id')
    .references(() => course.courseId)
    .notNull(),
});

export type SelectVideo = InferSelectModel<typeof video>;
export type InsertVideo = InferInsertModel<typeof video>;

export const viewRecord = pgTable('view_record', {
  viewRecordId: bigserial('view_record_id', { mode: 'number' })
    .primaryKey()
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  userId: integer('user_id')
    .references(() => user.userId)
    .notNull(),
  videoId: integer('video_id')
    .references(() => video.videoId)
    .notNull(),
  videoTimeAnchor: varchar('video_time_anchor', { length: 25 }).notNull(),
});

export type SelectViewRecord = InferSelectModel<typeof viewRecord>;
export type InsertViewRecord = InferInsertModel<typeof viewRecord>;

export const playlist = pgTable('playlist', {
  playlistId: bigserial('playlist_id', { mode: 'number' })
    .primaryKey()
    .notNull(),
  courseId: integer('course_id')
    .references(() => course.courseId)
    .notNull(),
  userId: integer('user_id')
    .references(() => user.userId)
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type SelectPlaylist = InferSelectModel<typeof playlist>;
export type InsertPlaylist = InferInsertModel<typeof playlist>;

export const favorite = pgTable('favorite', {
  favoriteId: bigserial('favorite_id', { mode: 'number' })
    .primaryKey()
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  userId: integer('user_id')
    .references(() => user.userId)
    .notNull(),
  videoId: integer('video_id')
    .references(() => video.videoId)
    .notNull(),
});

export type SelectFavorite = InferSelectModel<typeof favorite>;
export type InsertFavorite = InferInsertModel<typeof favorite>;

// export const enroll = pgTable('enroll', {
//   enrollTime: timestamp('enroll_time', { withTimezone: true })
//     .defaultNow()
//     .notNull(),
//   userId: integer('user_id').references(() => user.userId),
//   courseId: integer('course_id').references(() => course.courseId),
// });
