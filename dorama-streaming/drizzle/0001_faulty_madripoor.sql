CREATE TABLE "dorama" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"description" text NOT NULL,
	"cover_image_id" uuid NOT NULL,
	"banner_image_id" uuid NOT NULL,
	"trailer_url" text,
	"country" text NOT NULL,
	"year" integer NOT NULL,
	"status" "dorama_status" NOT NULL,
	"schedule_day" "week_day",
	"schedule_time" time,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"popularity_score" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "dorama_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "episode" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"season_id" uuid NOT NULL,
	"number" integer NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"thumbnail" uuid,
	"duration" integer NOT NULL,
	"releaseDate" timestamp NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "streams" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"episode_id" uuid NOT NULL,
	"language_id" uuid NOT NULL,
	"quality" "stream_quality" NOT NULL,
	"stream_type" "stream_type" NOT NULL,
	"url" text NOT NULL,
	"server_name" text,
	"is_default" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Dorama" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "Episode" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "episode_streams" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "Dorama" CASCADE;--> statement-breakpoint
DROP TABLE "Episode" CASCADE;--> statement-breakpoint
DROP TABLE "episode_streams" CASCADE;--> statement-breakpoint
ALTER TABLE "season" DROP CONSTRAINT "season_dorama_id_Dorama_id_fk";
--> statement-breakpoint
ALTER TABLE "DoramaGenre" DROP CONSTRAINT "DoramaGenre_doramaId_Dorama_id_fk";
--> statement-breakpoint
ALTER TABLE "DoramaStaff" DROP CONSTRAINT "DoramaStaff_doramaId_Dorama_id_fk";
--> statement-breakpoint
ALTER TABLE "episode_views" DROP CONSTRAINT "episode_views_episode_id_Episode_id_fk";
--> statement-breakpoint
ALTER TABLE "subtitles" DROP CONSTRAINT "subtitles_stream_id_episode_streams_id_fk";
--> statement-breakpoint
ALTER TABLE "continue_watching" DROP CONSTRAINT "continue_watching_episode_id_Episode_id_fk";
--> statement-breakpoint
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_dorama_id_Dorama_id_fk";
--> statement-breakpoint
ALTER TABLE "ratings" DROP CONSTRAINT "ratings_dorama_id_Dorama_id_fk";
--> statement-breakpoint
ALTER TABLE "dorama" ADD CONSTRAINT "dorama_cover_image_id_image_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."image"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dorama" ADD CONSTRAINT "dorama_banner_image_id_image_id_fk" FOREIGN KEY ("banner_image_id") REFERENCES "public"."image"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "episode" ADD CONSTRAINT "episode_season_id_season_id_fk" FOREIGN KEY ("season_id") REFERENCES "public"."season"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "episode" ADD CONSTRAINT "episode_thumbnail_image_id_fk" FOREIGN KEY ("thumbnail") REFERENCES "public"."image"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "streams" ADD CONSTRAINT "streams_episode_id_episode_id_fk" FOREIGN KEY ("episode_id") REFERENCES "public"."episode"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "streams" ADD CONSTRAINT "streams_language_id_Language_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."Language"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "season" ADD CONSTRAINT "season_dorama_id_dorama_id_fk" FOREIGN KEY ("dorama_id") REFERENCES "public"."dorama"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "DoramaGenre" ADD CONSTRAINT "DoramaGenre_doramaId_dorama_id_fk" FOREIGN KEY ("doramaId") REFERENCES "public"."dorama"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "DoramaStaff" ADD CONSTRAINT "DoramaStaff_doramaId_dorama_id_fk" FOREIGN KEY ("doramaId") REFERENCES "public"."dorama"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "episode_views" ADD CONSTRAINT "episode_views_episode_id_episode_id_fk" FOREIGN KEY ("episode_id") REFERENCES "public"."episode"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subtitles" ADD CONSTRAINT "subtitles_stream_id_streams_id_fk" FOREIGN KEY ("stream_id") REFERENCES "public"."streams"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "continue_watching" ADD CONSTRAINT "continue_watching_episode_id_episode_id_fk" FOREIGN KEY ("episode_id") REFERENCES "public"."episode"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_dorama_id_dorama_id_fk" FOREIGN KEY ("dorama_id") REFERENCES "public"."dorama"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_dorama_id_dorama_id_fk" FOREIGN KEY ("dorama_id") REFERENCES "public"."dorama"("id") ON DELETE cascade ON UPDATE no action;