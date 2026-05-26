CREATE TYPE "public"."Role" AS ENUM('USER', 'ADMIN', 'SUPER_ADMIN', 'MODERATOR', 'GUEST', 'EDITOR', 'CONTRIBUTOR', 'VIEWER', 'MEMBER');--> statement-breakpoint
CREATE TYPE "public"."dorama_status" AS ENUM('Em Lançamento', 'Completo', 'Em Hiato', 'Cancelado', 'Em breve');--> statement-breakpoint
CREATE TYPE "public"."week_day" AS ENUM('Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo');--> statement-breakpoint
CREATE TYPE "public"."season_status" AS ENUM('Em Lançamento', 'Completo', 'Em Hiato', 'Cancelado', 'Em breve');--> statement-breakpoint
CREATE TYPE "public"."stream_quality" AS ENUM('360p', '480p', '720p', '1080p', '4K');--> statement-breakpoint
CREATE TYPE "public"."stream_type" AS ENUM('HLS', 'MP4', 'DASH', 'WebM', 'Other');--> statement-breakpoint
CREATE TYPE "public"."report_status" AS ENUM('Pendente', 'Em Revisão', 'Resolvido', 'Rejeitado');--> statement-breakpoint
CREATE TYPE "public"."report_type" AS ENUM('Postagem', 'Comentário', 'Mensagem', 'Usuário');--> statement-breakpoint
CREATE TYPE "public"."report_document_type" AS ENUM('Imagem', 'Video', 'Documento');--> statement-breakpoint
CREATE TYPE "public"."admin_log_action" AS ENUM('Banir Usuário', 'Desbanir Usuário', 'Silenciar Usuário', 'Desilenciar Usuário', 'Suspender Usuário', 'Restaurar Usuário', 'Editar Mensagem', 'Deletar Mensagem', 'Editar Postagem', 'Deletar Postagem', 'Editar Comentário', 'Deletar Comentário');--> statement-breakpoint
CREATE TYPE "public"."appeal_status" AS ENUM('Pendente', 'Aprovado', 'Rejeitado');--> statement-breakpoint
CREATE TYPE "public"."punishment_status" AS ENUM('Ativo', 'Expirado', 'Removido');--> statement-breakpoint
CREATE TYPE "public"."punishment_type" AS ENUM('Alerta de Violação', 'Mutar Usuário', 'BAN', 'Suspensão Temporária');--> statement-breakpoint
CREATE TYPE "public"."staff_role" AS ENUM('Ator Principal', 'Ator Secundário', 'Diretor', 'Roteirista', 'Produtor', 'Compositor', 'Cinematógrafo', 'Editor', 'Designer de Produção');--> statement-breakpoint
CREATE TABLE "User" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_name" text NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"profile_picture" uuid,
	"banner" uuid,
	"role" "Role" DEFAULT 'USER',
	"created_At" timestamp DEFAULT now(),
	CONSTRAINT "User_user_name_unique" UNIQUE("user_name"),
	CONSTRAINT "User_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"device_id" uuid NOT NULL,
	"token" text NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"expires_at" timestamp NOT NULL,
	"revoked" boolean DEFAULT false NOT NULL,
	"last_login_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "device" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"device_name" text NOT NULL,
	"device_model" text,
	"platform" text,
	"browser" text,
	"first_seen_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_used_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Dorama" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"description" text NOT NULL,
	"cover_Image" uuid NOT NULL,
	"banner_Image" uuid NOT NULL,
	"trailer_Url" text,
	"country" text NOT NULL,
	"year" integer NOT NULL,
	"status" "dorama_status" NOT NULL,
	"schedule_Day" "week_day",
	"schedule_Time" time,
	"created_At" timestamp DEFAULT now(),
	"updated_At" timestamp DEFAULT now(),
	CONSTRAINT "Dorama_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "season" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"dorama_id" uuid NOT NULL,
	"season_number" integer NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"status" "season_status" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"number_of_episodes" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Episode" (
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
CREATE TABLE "Genre" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	CONSTRAINT "Genre_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "image" (
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
CREATE TABLE "episode_streams" (
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
CREATE TABLE "Staff" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"age" text,
	"dateOfBirth" text,
	"nacionalitie" text,
	"created_At" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "chat" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "comments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"episode_id" uuid NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"deleted_by_id" uuid,
	"status" text DEFAULT 'active' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"Chat" uuid NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"deleted_by_id" uuid,
	"status" text DEFAULT 'active' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notification" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"global" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"reporter_id" uuid NOT NULL,
	"target_id" uuid NOT NULL,
	"target_type" "report_type" NOT NULL,
	"reason" text NOT NULL,
	"status" "report_status" DEFAULT 'Pendente' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "evidence" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"report_id" uuid NOT NULL,
	"image_id" uuid,
	"type" "report_document_type" NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "admin_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"admin_id" uuid,
	"target_id" uuid,
	"action" "admin_log_action" NOT NULL,
	"details" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "appeals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"punishment_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"reason" text NOT NULL,
	"status" "appeal_status" DEFAULT 'Pendente' NOT NULL,
	"reviewed_by" uuid,
	"response" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "punishments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"moderator_id" uuid,
	"type" "punishment_type" NOT NULL,
	"reason" text NOT NULL,
	"status" "punishment_status" DEFAULT 'Ativo' NOT NULL,
	"expires_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "comment_likes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"comment_id" uuid NOT NULL,
	CONSTRAINT "comment_likes_user_id_comment_id_unique" UNIQUE("user_id","comment_id")
);
--> statement-breakpoint
CREATE TABLE "DoramaGenre" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"doramaId" uuid,
	"genreId" uuid,
	CONSTRAINT "DoramaGenre_doramaId_genreId_unique" UNIQUE("doramaId","genreId")
);
--> statement-breakpoint
CREATE TABLE "DoramaStaff" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"doramaId" uuid,
	"staffId" uuid,
	"staff_role" "staff_role" NOT NULL,
	CONSTRAINT "DoramaStaff_doramaId_staffId_staff_role_unique" UNIQUE("doramaId","staffId","staff_role")
);
--> statement-breakpoint
CREATE TABLE "episode_views" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"episode_id" uuid NOT NULL,
	"watched_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_achievements" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"achievement_id" uuid NOT NULL,
	"progress" integer DEFAULT 0 NOT NULL,
	"completed" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_badges" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"badge_id" uuid NOT NULL,
	"earned_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_notifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"notification_id" uuid NOT NULL,
	"read" boolean DEFAULT false NOT NULL,
	"read_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "achievements" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"required_progress" integer DEFAULT 1 NOT NULL,
	"reward_xp" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "achievements_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "badges" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"image_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "badges_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "settings" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"language" uuid,
	"theme" text DEFAULT 'dark' NOT NULL,
	"autoplay" boolean DEFAULT true NOT NULL,
	"auto_next_episode" boolean DEFAULT true NOT NULL,
	"show_mature_content" boolean DEFAULT false NOT NULL,
	"preferred_quality" text DEFAULT '1080p' NOT NULL,
	"subtitle_language" uuid,
	"audio_language" uuid,
	"notifications_enabled" boolean DEFAULT true NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Language" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"code" text NOT NULL,
	"created_At" timestamp DEFAULT now(),
	"updated_At" timestamp DEFAULT now(),
	CONSTRAINT "Language_name_unique" UNIQUE("name"),
	CONSTRAINT "Language_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "subtitles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"stream_id" uuid NOT NULL,
	"language_id" uuid NOT NULL,
	"url" text NOT NULL,
	"format" text,
	"is_default" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "search_history" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"query" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "continue_watching" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"episode_id" uuid NOT NULL,
	"progress_seconds" integer DEFAULT 0 NOT NULL,
	"duration_seconds" integer NOT NULL,
	"started_at" timestamp DEFAULT now() NOT NULL,
	"last_watched_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "continue_watching_user_id_episode_id_unique" UNIQUE("user_id","episode_id")
);
--> statement-breakpoint
CREATE TABLE "favorites" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"dorama_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "favorites_user_id_dorama_id_unique" UNIQUE("user_id","dorama_id")
);
--> statement-breakpoint
CREATE TABLE "ratings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"dorama_id" uuid NOT NULL,
	"rating" integer NOT NULL,
	"review" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "ratings_user_id_dorama_id_unique" UNIQUE("user_id","dorama_id")
);
--> statement-breakpoint
ALTER TABLE "User" ADD CONSTRAINT "User_profile_picture_image_id_fk" FOREIGN KEY ("profile_picture") REFERENCES "public"."image"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "User" ADD CONSTRAINT "User_banner_image_id_fk" FOREIGN KEY ("banner") REFERENCES "public"."image"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_device_id_device_id_fk" FOREIGN KEY ("device_id") REFERENCES "public"."device"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "device" ADD CONSTRAINT "device_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Dorama" ADD CONSTRAINT "Dorama_cover_Image_image_id_fk" FOREIGN KEY ("cover_Image") REFERENCES "public"."image"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Dorama" ADD CONSTRAINT "Dorama_banner_Image_image_id_fk" FOREIGN KEY ("banner_Image") REFERENCES "public"."image"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "season" ADD CONSTRAINT "season_dorama_id_Dorama_id_fk" FOREIGN KEY ("dorama_id") REFERENCES "public"."Dorama"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Episode" ADD CONSTRAINT "Episode_season_id_season_id_fk" FOREIGN KEY ("season_id") REFERENCES "public"."season"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Episode" ADD CONSTRAINT "Episode_thumbnail_image_id_fk" FOREIGN KEY ("thumbnail") REFERENCES "public"."image"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "episode_streams" ADD CONSTRAINT "episode_streams_episode_id_Episode_id_fk" FOREIGN KEY ("episode_id") REFERENCES "public"."Episode"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "episode_streams" ADD CONSTRAINT "episode_streams_language_id_Language_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."Language"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_episode_id_User_id_fk" FOREIGN KEY ("episode_id") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_deleted_by_id_User_id_fk" FOREIGN KEY ("deleted_by_id") REFERENCES "public"."User"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_Chat_chat_id_fk" FOREIGN KEY ("Chat") REFERENCES "public"."chat"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_deleted_by_id_User_id_fk" FOREIGN KEY ("deleted_by_id") REFERENCES "public"."User"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reports" ADD CONSTRAINT "reports_reporter_id_User_id_fk" FOREIGN KEY ("reporter_id") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "evidence" ADD CONSTRAINT "evidence_report_id_reports_id_fk" FOREIGN KEY ("report_id") REFERENCES "public"."reports"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "evidence" ADD CONSTRAINT "evidence_image_id_image_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."image"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "admin_logs" ADD CONSTRAINT "admin_logs_admin_id_User_id_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."User"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appeals" ADD CONSTRAINT "appeals_punishment_id_punishments_id_fk" FOREIGN KEY ("punishment_id") REFERENCES "public"."punishments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appeals" ADD CONSTRAINT "appeals_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appeals" ADD CONSTRAINT "appeals_reviewed_by_User_id_fk" FOREIGN KEY ("reviewed_by") REFERENCES "public"."User"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "punishments" ADD CONSTRAINT "punishments_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "punishments" ADD CONSTRAINT "punishments_moderator_id_User_id_fk" FOREIGN KEY ("moderator_id") REFERENCES "public"."User"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comment_likes" ADD CONSTRAINT "comment_likes_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comment_likes" ADD CONSTRAINT "comment_likes_comment_id_comments_id_fk" FOREIGN KEY ("comment_id") REFERENCES "public"."comments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "DoramaGenre" ADD CONSTRAINT "DoramaGenre_doramaId_Dorama_id_fk" FOREIGN KEY ("doramaId") REFERENCES "public"."Dorama"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "DoramaGenre" ADD CONSTRAINT "DoramaGenre_genreId_Genre_id_fk" FOREIGN KEY ("genreId") REFERENCES "public"."Genre"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "DoramaStaff" ADD CONSTRAINT "DoramaStaff_doramaId_Dorama_id_fk" FOREIGN KEY ("doramaId") REFERENCES "public"."Dorama"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "DoramaStaff" ADD CONSTRAINT "DoramaStaff_staffId_Staff_id_fk" FOREIGN KEY ("staffId") REFERENCES "public"."Staff"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "episode_views" ADD CONSTRAINT "episode_views_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "episode_views" ADD CONSTRAINT "episode_views_episode_id_Episode_id_fk" FOREIGN KEY ("episode_id") REFERENCES "public"."Episode"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_achievements" ADD CONSTRAINT "user_achievements_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_achievements" ADD CONSTRAINT "user_achievements_achievement_id_achievements_id_fk" FOREIGN KEY ("achievement_id") REFERENCES "public"."achievements"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_badges" ADD CONSTRAINT "user_badges_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_badges" ADD CONSTRAINT "user_badges_badge_id_badges_id_fk" FOREIGN KEY ("badge_id") REFERENCES "public"."badges"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_notifications" ADD CONSTRAINT "user_notifications_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_notifications" ADD CONSTRAINT "user_notifications_notification_id_notification_id_fk" FOREIGN KEY ("notification_id") REFERENCES "public"."notification"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "badges" ADD CONSTRAINT "badges_image_id_image_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."image"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "settings" ADD CONSTRAINT "settings_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "settings" ADD CONSTRAINT "settings_language_Language_id_fk" FOREIGN KEY ("language") REFERENCES "public"."Language"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "settings" ADD CONSTRAINT "settings_subtitle_language_Language_id_fk" FOREIGN KEY ("subtitle_language") REFERENCES "public"."Language"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "settings" ADD CONSTRAINT "settings_audio_language_Language_id_fk" FOREIGN KEY ("audio_language") REFERENCES "public"."Language"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subtitles" ADD CONSTRAINT "subtitles_stream_id_episode_streams_id_fk" FOREIGN KEY ("stream_id") REFERENCES "public"."episode_streams"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subtitles" ADD CONSTRAINT "subtitles_language_id_Language_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."Language"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "search_history" ADD CONSTRAINT "search_history_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "continue_watching" ADD CONSTRAINT "continue_watching_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "continue_watching" ADD CONSTRAINT "continue_watching_episode_id_Episode_id_fk" FOREIGN KEY ("episode_id") REFERENCES "public"."Episode"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_dorama_id_Dorama_id_fk" FOREIGN KEY ("dorama_id") REFERENCES "public"."Dorama"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_dorama_id_Dorama_id_fk" FOREIGN KEY ("dorama_id") REFERENCES "public"."Dorama"("id") ON DELETE cascade ON UPDATE no action;