DO $$ BEGIN CREATE TYPE "role" AS ENUM('guest', 'student', 'teacher');
EXCEPTION
WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "course" (
	"course_id" bigserial PRIMARY KEY NOT NULL,
	"name" varchar(45) NOT NULL,
	"description" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"teacher_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "enroll" (
	"enroll_time" timestamp with time zone DEFAULT now() NOT NULL,
	"user_id" integer,
	"course_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "favorite" (
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"user_id" integer,
	"course_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "scheduled_video" (
	"video_id" integer,
	"user_id" integer,
	"rank" varchar(25),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"user_id" bigserial PRIMARY KEY NOT NULL,
	"guest" "role" DEFAULT 'guest' NOT NULL,
	"name" varchar(45) NOT NULL,
	"email" varchar(45) NOT NULL,
	"password" varchar(45) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "video" (
	"video_id" bigserial PRIMARY KEY NOT NULL,
	"name" varchar(45) NOT NULL,
	"length" varchar(45) NOT NULL,
	"description" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"course_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "view_record" (
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"user_id" integer,
	"video_id" integer
);
--> statement-breakpoint
DO $$ BEGIN
ALTER TABLE "course"
ADD CONSTRAINT "course_teacher_id_user_user_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
ALTER TABLE "enroll"
ADD CONSTRAINT "enroll_user_id_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
ALTER TABLE "enroll"
ADD CONSTRAINT "enroll_course_id_course_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "course"("course_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
ALTER TABLE "favorite"
ADD CONSTRAINT "favorite_user_id_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
ALTER TABLE "favorite"
ADD CONSTRAINT "favorite_course_id_course_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "course"("course_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
ALTER TABLE "scheduled_video"
ADD CONSTRAINT "scheduled_video_video_id_video_video_id_fk" FOREIGN KEY ("video_id") REFERENCES "video"("video_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
ALTER TABLE "scheduled_video"
ADD CONSTRAINT "scheduled_video_user_id_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
ALTER TABLE "video"
ADD CONSTRAINT "video_course_id_course_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "course"("course_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
ALTER TABLE "view_record"
ADD CONSTRAINT "view_record_user_id_user_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
ALTER TABLE "view_record"
ADD CONSTRAINT "view_record_video_id_video_video_id_fk" FOREIGN KEY ("video_id") REFERENCES "video"("video_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
WHEN duplicate_object THEN null;
END $$;