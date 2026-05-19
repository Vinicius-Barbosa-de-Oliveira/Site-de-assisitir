import {
  pgTable,
  uuid,
  text,
  boolean,
} from "drizzle-orm/pg-core";

import { episodestreams } from "../content/stream";
import { languages } from "../system/languages";

export const subtitles = pgTable("subtitles", {
  id: uuid("id").primaryKey().defaultRandom(),

  streamId: uuid("stream_id")
    .references(() => episodestreams.id, {
      onDelete: "cascade",
    })
    .notNull(),

  languageId: uuid("language_id")
    .references(() => languages.id)
    .notNull(),

  url: text("url").notNull(),

  format: text("format"),

  isDefault: boolean("is_default")
    .default(false)
    .notNull(),
});