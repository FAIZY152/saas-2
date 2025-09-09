CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"fullname" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" text NOT NULL,
	"provider" varchar(50) DEFAULT 'credentials',
	"google_id" varchar(255),
	"avatar" text,
	"is_verified" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
