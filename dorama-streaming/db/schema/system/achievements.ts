import {
  pgTable,
  uuid,
  text,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

export const achievements = pgTable("achievements", {
  id: uuid("id").primaryKey().defaultRandom(),

  name: text("name")
    .unique()
    .notNull(),

  description: text("description"),

  requiredProgress: integer("required_progress")
    .default(1)
    .notNull(),

  rewardXp: integer("reward_xp")
    .default(0)
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});