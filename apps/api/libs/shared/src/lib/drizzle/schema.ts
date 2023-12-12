import { InferInsertModel, InferSelectModel, relations } from 'drizzle-orm';
import {
  bigserial,
  integer,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

import { Type } from 'class-transformer';

export const roleEnum = pgEnum('role', ['guest', 'student', 'teacher']);

export const user = pgTable('users', {
  userId: bigserial('user_id', { mode: 'number' }).primaryKey().notNull(),
  role: roleEnum('role').default('guest').notNull(),
  name: varchar('name', { length: 45 }).notNull().unique(),
  email: varchar('email', { length: 45 }).notNull().unique(),
  password: varchar('password').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const usersRelations = relations(user, ({ many }) => ({
  course: many(course),
}));

export type SelectUser = Omit<InferSelectModel<typeof user>, 'password'>;
export type InsertUser = InferInsertModel<typeof user>;

export const course = pgTable('course', {
  courseId: bigserial('course_id', { mode: 'number' }).primaryKey().notNull(),
  name: varchar('name', { length: 45 }).notNull(),
  description: varchar('description', { length: 255 }).notNull(),
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

export const courseRelations = relations(course, ({ one }) => ({
  teacher: one(user, {
    fields: [course.teacherId],
    references: [user.userId],
  }),
}));

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

export const enroll = pgTable('enroll', {
  enrollTime: timestamp('enroll_time', { withTimezone: true })
    .defaultNow()
    .notNull(),
  userId: integer('user_id').references(() => user.userId),
  courseId: integer('course_id').references(() => course.courseId),
});

export const favorite = pgTable('favorite', {
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  userId: integer('user_id').references(() => user.userId),
  courseId: integer('course_id').references(() => course.courseId),
});

export const video = pgTable('video', {
  videoId: bigserial('video_id', { mode: 'number' }).primaryKey().notNull(),
  name: varchar('name', { length: 45 }).notNull(),
  length: varchar('length', { length: 45 }).notNull(),
  description: varchar('description', { length: 255 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  courseId: integer('course_id').references(() => course.courseId),
});

export const viewRecord = pgTable('view_record', {
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  userId: integer('user_id').references(() => user.userId),
  videoId: integer('video_id').references(() => video.videoId),
});

export const scheduledVideo = pgTable('scheduled_video', {
  videoId: integer('video_id').references(() => video.videoId),
  userId: integer('user_id').references(() => user.userId),
  rank: varchar('rank', { length: 25 }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
