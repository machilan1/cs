ALTER TABLE "users"
ADD CONSTRAINT "users_name_unique" UNIQUE("name");
--> statement-breakpoint
ALTER TABLE "users"
ADD CONSTRAINT "users_email_unique" UNIQUE("email");