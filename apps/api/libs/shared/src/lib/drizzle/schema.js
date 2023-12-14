"use strict";
exports.__esModule = true;
exports.favorite = exports.playlist = exports.viewRecord = exports.video = exports.category = exports.course = exports.user = exports.roleEnum = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
exports.roleEnum = (0, pg_core_1.pgEnum)('role', ['guest', 'student', 'teacher']);
exports.user = (0, pg_core_1.pgTable)('users', {
    userId: (0, pg_core_1.bigserial)('user_id', { mode: 'number' }).primaryKey().notNull(),
    role: (0, exports.roleEnum)('role')["default"]('guest').notNull(),
    name: (0, pg_core_1.varchar)('name', { length: 45 }).notNull().unique(),
    email: (0, pg_core_1.varchar)('email', { length: 45 }).notNull().unique(),
    avatar: (0, pg_core_1.varchar)('avatar', { length: 255 }),
    password: (0, pg_core_1.varchar)('password').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true })
        .defaultNow()
        .notNull()
});
exports.course = (0, pg_core_1.pgTable)('course', {
    courseId: (0, pg_core_1.bigserial)('course_id', { mode: 'number' }).primaryKey().notNull(),
    name: (0, pg_core_1.varchar)('name', { length: 45 }).notNull(),
    description: (0, pg_core_1.varchar)('description', { length: 255 }).notNull(),
    thumbnail: (0, pg_core_1.varchar)('thumbnail', { length: 255 }).notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true })
        .defaultNow()
        .notNull(),
    teacherId: (0, pg_core_1.integer)('teacher_id')
        .references(function () { return exports.user.userId; })
        .notNull(),
    categoryId: (0, pg_core_1.integer)('categoryId')
        .references(function () { return exports.category.categoryId; })
        .notNull()
});
exports.category = (0, pg_core_1.pgTable)('category', {
    categoryId: (0, pg_core_1.bigserial)('category_id', { mode: 'number' })
        .primaryKey()
        .notNull(),
    name: (0, pg_core_1.varchar)('name', { length: 45 }).notNull()
});
exports.video = (0, pg_core_1.pgTable)('video', {
    videoId: (0, pg_core_1.bigserial)('video_id', { mode: 'number' }).primaryKey().notNull(),
    name: (0, pg_core_1.varchar)('name', { length: 45 }).notNull(),
    length: (0, pg_core_1.varchar)('length', { length: 45 }).notNull(),
    description: (0, pg_core_1.varchar)('description', { length: 255 }).notNull(),
    fileLink: (0, pg_core_1.varchar)('file_link', { length: 255 }).notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true })
        .defaultNow()
        .notNull(),
    courseId: (0, pg_core_1.integer)('course_id')
        .references(function () { return exports.course.courseId; })
        .notNull()
});
exports.viewRecord = (0, pg_core_1.pgTable)('view_record', {
    viewRecordId: (0, pg_core_1.bigserial)('view_record_id', { mode: 'number' })
        .primaryKey()
        .notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true })
        .defaultNow()
        .notNull(),
    userId: (0, pg_core_1.integer)('user_id')
        .references(function () { return exports.user.userId; })
        .notNull(),
    videoId: (0, pg_core_1.integer)('video_id')
        .references(function () { return exports.video.videoId; })
        .notNull(),
    videoTimeAnchor: (0, pg_core_1.varchar)('video_time_anchor', { length: 25 }).notNull()
});
exports.playlist = (0, pg_core_1.pgTable)('playlist', {
    playlistId: (0, pg_core_1.bigserial)('playlist_id', { mode: 'number' })
        .primaryKey()
        .notNull(),
    courseId: (0, pg_core_1.integer)('course_id')
        .references(function () { return exports.course.courseId; })
        .notNull(),
    userId: (0, pg_core_1.integer)('user_id')
        .references(function () { return exports.user.userId; })
        .notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true })
        .defaultNow()
        .notNull()
});
exports.favorite = (0, pg_core_1.pgTable)('favorite', {
    favoriteId: (0, pg_core_1.bigserial)('favorite_id', { mode: 'number' })
        .primaryKey()
        .notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true })
        .defaultNow()
        .notNull(),
    userId: (0, pg_core_1.integer)('user_id')
        .references(function () { return exports.user.userId; })
        .notNull(),
    videoId: (0, pg_core_1.integer)('video_id')
        .references(function () { return exports.video.videoId; })
        .notNull()
});
// export const enroll = pgTable('enroll', {
//   enrollTime: timestamp('enroll_time', { withTimezone: true })
//     .defaultNow()
//     .notNull(),
//   userId: integer('user_id').references(() => user.userId),
//   courseId: integer('course_id').references(() => course.courseId),
// });
