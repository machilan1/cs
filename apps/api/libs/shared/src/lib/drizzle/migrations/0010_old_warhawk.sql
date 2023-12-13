DROP TABLE "enroll";--> statement-breakpoint
ALTER TABLE "scheduled_video" RENAME TO "playlist";--> statement-breakpoint
ALTER TABLE "favorite" RENAME COLUMN "course_id" TO "video_id";--> statement-breakpoint
ALTER TABLE "playlist" RENAME COLUMN "video_id" TO "course_id";--> statement-breakpoint
ALTER TABLE "favorite" DROP CONSTRAINT "favorite_course_id_course_course_id_fk";
--> statement-breakpoint
ALTER TABLE "playlist" DROP CONSTRAINT "scheduled_video_video_id_video_video_id_fk";
--> statement-breakpoint
ALTER TABLE "playlist" DROP CONSTRAINT "scheduled_video_user_id_users_user_id_fk";
--> statement-breakpoint
ALTER TABLE "view_record" ADD COLUMN "video_time_anchor" varchar(25) NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "favorite" ADD CONSTRAINT "favorite_video_id_video_video_id_fk" FOREIGN KEY ("video_id") REFERENCES "video"("video_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "playlist" ADD CONSTRAINT "playlist_course_id_course_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "course"("course_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "playlist" ADD CONSTRAINT "playlist_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "playlist" DROP COLUMN IF EXISTS "rank";