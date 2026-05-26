import {
  pgTable,
  uuid,
  text,
  boolean,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

import { episode } from "./episodes";
import { language } from "../system/languages";

export const streamQualityEnum = pgEnum("stream_quality", [
  "360p",
  "480p",
  "720p",
  "1080p",
  "4K",
]);

export const streamTypeEnum = pgEnum("stream_type", [
  "HLS",
  "MP4",
  "DASH",
  "WebM",
  "Other",
]);

export const stream = pgTable("streams", {
  id: uuid("id").primaryKey().defaultRandom(),

  episodeId: uuid("episode_id").references(() => episode.id, {onDelete: "cascade",}).notNull(),

  languageId: uuid("language_id").references(() => language.id, {onDelete: "cascade",}).notNull(),

  quality: streamQualityEnum("quality").notNull(),

  streamType: streamTypeEnum("stream_type").notNull(),

  url: text("url").notNull(),

  serverName: text("server_name"),

  isDefault: boolean("is_default").default(false).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});