CREATE TABLE IF NOT EXISTS "category" (
	"category_id" bigserial PRIMARY KEY NOT NULL,
	"name" varchar(45) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "course" ADD COLUMN "category" varchar(45) NOT NULL;--> statement-breakpoint
ALTER TABLE "course" ADD COLUMN "categoryId" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "course" ADD CONSTRAINT "course_categoryId_category_category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "category"("category_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
