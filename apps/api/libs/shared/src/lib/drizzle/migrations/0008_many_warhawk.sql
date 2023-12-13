ALTER TABLE "course" ADD COLUMN "thumbnail" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "avatar" varchar(255);--> statement-breakpoint
ALTER TABLE "video" ADD COLUMN "file_link" varchar(255) NOT NULL;