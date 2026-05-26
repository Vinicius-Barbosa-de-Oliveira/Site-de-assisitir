import {
  pgTable,
  uuid,
  boolean,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { user } from "../core/users";
import { language } from "./languages";


export const Settings = pgTable("settings", {
  userId: uuid("user_id").primaryKey().references(() => user.id, {onDelete: "cascade",}),

  languageId: uuid("language").references(() => language.id, {onDelete: "set null",}),

  theme: text("theme").default("dark").notNull(),

  autoplay: boolean("autoplay").default(true).notNull(),

  autoNextEpisode: boolean("auto_next_episode").default(true).notNull(),

  showMatureContent: boolean("show_mature_content").default(false).notNull(),

  preferredQuality: text("preferred_quality").default("1080p").notNull(),

  subtitleLanguage: uuid("subtitle_language").references(() => language.id, {onDelete: "set null",}),

  audioLanguage: uuid("audio_language").references(() => language.id, {onDelete: "set null",}),

  notificationsEnabled: boolean("notifications_enabled").default(true).notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});