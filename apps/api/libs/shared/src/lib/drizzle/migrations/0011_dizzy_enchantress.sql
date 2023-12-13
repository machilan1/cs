ALTER TABLE "favorite" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "favorite" ALTER COLUMN "video_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "playlist" ALTER COLUMN "course_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "playlist" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "view_record" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "view_record" ALTER COLUMN "video_id" SET NOT NULL;