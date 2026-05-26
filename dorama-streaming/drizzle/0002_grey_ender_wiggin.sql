CREATE TABLE "images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"url" text NOT NULL,
	"alt" text,
	"width" integer,
	"height" integer,
	"size_kb" integer,
	"mime_type" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "image" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "image" CASCADE;--> statement-breakpoint
ALTER TABLE "User" DROP CONSTRAINT "User_profile_picture_image_id_fk";
--> statement-breakpoint
ALTER TABLE "User" DROP CONSTRAINT "User_banner_image_id_fk";
--> statement-breakpoint
ALTER TABLE "dorama" DROP CONSTRAINT "dorama_cover_image_id_image_id_fk";
--> statement-breakpoint
ALTER TABLE "dorama" DROP CONSTRAINT "dorama_banner_image_id_image_id_fk";
--> statement-breakpoint
ALTER TABLE "episode" DROP CONSTRAINT "episode_thumbnail_image_id_fk";
--> statement-breakpoint
ALTER TABLE "evidence" DROP CONSTRAINT "evidence_image_id_image_id_fk";
--> statement-breakpoint
ALTER TABLE "badges" DROP CONSTRAINT "badges_image_id_image_id_fk";
--> statement-breakpoint
ALTER TABLE "User" ADD CONSTRAINT "User_profile_picture_images_id_fk" FOREIGN KEY ("profile_picture") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "User" ADD CONSTRAINT "User_banner_images_id_fk" FOREIGN KEY ("banner") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dorama" ADD CONSTRAINT "dorama_cover_image_id_images_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dorama" ADD CONSTRAINT "dorama_banner_image_id_images_id_fk" FOREIGN KEY ("banner_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "episode" ADD CONSTRAINT "episode_thumbnail_images_id_fk" FOREIGN KEY ("thumbnail") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "evidence" ADD CONSTRAINT "evidence_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "badges" ADD CONSTRAINT "badges_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;