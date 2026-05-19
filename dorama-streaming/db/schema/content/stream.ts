import {
  pgTable,
  uuid,
  text,
  boolean,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

import { episodes } from "./episodes";
import { languages } from "../system/languages";

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

export const episodestreams = pgTable("episode_streams", {
  id: uuid("id").primaryKey().defaultRandom(),

  episode_Id: uuid("episode_id").references(() => episodes.id, {onDelete: "cascade",}).notNull(),

  language_Id: uuid("language_id").references(() => languages.id),

  quality: streamQualityEnum("quality").notNull(),

  streamType: streamTypeEnum("stream_type").notNull(),

  url: text("url").notNull(),

  serverName: text("server_name"),

  isDefault: boolean("is_default").default(false).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});