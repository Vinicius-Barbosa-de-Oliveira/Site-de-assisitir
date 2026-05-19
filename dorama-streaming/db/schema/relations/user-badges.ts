import {
  pgTable,
  uuid,
  timestamp,
} from "drizzle-orm/pg-core";

import { users } from "../core/users";
import { badges } from "../system/badges";

export const userBadges = pgTable("user_badges", {
  id: uuid("id").primaryKey().defaultRandom(),

  userId: uuid("user_id")
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),

  badgeId: uuid("badge_id")
    .references(() => badges.id, {
      onDelete: "cascade",
    })
    .notNull(),

  earnedAt: timestamp("earned_at")
    .defaultNow()
    .notNull(),
});