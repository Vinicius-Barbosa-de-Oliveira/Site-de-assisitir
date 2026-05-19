import {
  pgTable,
  uuid,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { user } from "../core/users";

export const moderationNotes = pgTable("moderation_notes", {
  id: uuid("id").primaryKey().defaultRandom(),

  moderatorId: uuid("moderator_id")
    .references(() => user.id, {
      onDelete: "set null",
    }),

  targetUserId: uuid("target_user_id")
    .references(() => user.id, {
      onDelete: "cascade",
    })
    .notNull(),

  note: text("note")
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});