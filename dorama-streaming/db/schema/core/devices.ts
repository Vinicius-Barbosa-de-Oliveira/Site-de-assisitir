import {
  pgTable,
  uuid,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { user } from "./users";

export const device = pgTable("device", {
  id: uuid("id").primaryKey().defaultRandom(),

  userId: uuid("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),

  deviceName: text("device_name").notNull(),

  deviceModel: text("device_model"),

  platform: text("platform"),

  browser: text("browser"),

  firstSeenAt: timestamp("first_seen_at", {
    withTimezone: true,
  }).defaultNow().notNull(),

  lastUsedAt: timestamp("last_used_at", {
    withTimezone: true,
  }).defaultNow().notNull(),
});