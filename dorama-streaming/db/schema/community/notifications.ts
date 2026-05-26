import {
  pgTable,
  uuid,
  text,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const notification = pgTable("notification", {
  id: uuid("id").primaryKey().defaultRandom(),

  title: text("title")
    .notNull(),

  content: text("content")
    .notNull(),

  global: boolean("global")
    .default(false)
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});