import {
  integer,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['guest', 'student', 'teacher']);

export const user = pgTable('user', {
  userId: integer('user_id').primaryKey().notNull(),
  role: roleEnum('').default('guest').notNull(),
  name: varchar('name', { length: 45 }).notNull(),
  email: varchar('email', { length: 45 }).notNull(),
  password: varchar('password', { length: 45 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const course = pgTable('course', {
  courseId: integer('course_id').primaryKey().notNull(),
  name: varchar('name', { length: 45 }).notNull(),
  description: varchar('description', { length: 255 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  teacherId: integer('teacher_id').references(() => user.userId),
});

export const enroll = pgTable('enroll', {
  enrollTime: timestamp('enroll_time', { withTimezone: true }).defaultNow(),
  userId: integer('user_id').references(() => user.userId),
  courseId: integer('course_id').references(() => course.courseId),
});

export const favorite = pgTable('favorite', {
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  userId: integer('user_id').references(() => user.userId),
  courseId: integer('course_id').references(() => course.courseId),
});

export const video = pgTable('video', {
  videoId: integer('video_id').primaryKey().notNull(),
  name: varchar('name', { length: 45 }).notNull(),
  length: varchar('length', { length: 45 }).notNull(),
  description: varchar('description', { length: 255 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  courseId: integer('course_id').references(() => course.courseId),
});

export const viewRecord = pgTable('view_record', {
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
  userId: integer('user_id').references(() => user.userId),
  videoId: integer('video_id').references(() => video.videoId),
});

export const scheduledVideo = pgTable('scheduled_video', {
  videoId: integer('video_id').references(() => video.videoId),
  userId: integer('user_id').references(() => user.userId),
  rank: varchar('rank', { length: 25 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});
