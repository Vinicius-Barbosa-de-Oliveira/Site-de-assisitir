import {
  pgTable,
  uuid,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const chat = pgTable("chat", {
    id: uuid("id").primaryKey().defaultRandom(),

    title: text("title").notNull(),

    description: text("description"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
});