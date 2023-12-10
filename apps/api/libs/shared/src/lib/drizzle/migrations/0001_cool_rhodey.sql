ALTER TABLE "user" RENAME TO "visitor";--> statement-breakpoint
ALTER TABLE "course" DROP CONSTRAINT "course_teacher_id_user_user_id_fk";
--> statement-breakpoint
ALTER TABLE "enroll" DROP CONSTRAINT "enroll_user_id_user_user_id_fk";
--> statement-breakpoint
ALTER TABLE "favorite" DROP CONSTRAINT "favorite_user_id_user_user_id_fk";
--> statement-breakpoint
ALTER TABLE "scheduled_video" DROP CONSTRAINT "scheduled_video_user_id_user_user_id_fk";
--> statement-breakpoint
ALTER TABLE "view_record" DROP CONSTRAINT "view_record_user_id_user_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "course" ADD CONSTRAINT "course_teacher_id_visitor_user_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "visitor"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "enroll" ADD CONSTRAINT "enroll_user_id_visitor_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "visitor"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "favorite" ADD CONSTRAINT "favorite_user_id_visitor_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "visitor"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scheduled_video" ADD CONSTRAINT "scheduled_video_user_id_visitor_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "visitor"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "view_record" ADD CONSTRAINT "view_record_user_id_visitor_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "visitor"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
