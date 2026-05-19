import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

import { user } from "../core/users";

export const messages = pgTable("messages", {
  id: uuid("id").primaryKey().defaultRandom(),

  senderId: uuid("sender_id")
    .references(() => user.id, {
      onDelete: "cascade",
    })
    .notNull(),

  receiverId: uuid("receiver_id")
    .references(() => user.id, {
      onDelete: "cascade",
    })
    .notNull(),

  content: text("content").notNull(),

  read: boolean("read")
    .default(false)
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});