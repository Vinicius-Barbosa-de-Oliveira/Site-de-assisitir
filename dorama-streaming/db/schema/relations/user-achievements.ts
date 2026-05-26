import {
  pgTable,
  uuid,
  integer,
  boolean,
} from "drizzle-orm/pg-core";

import { user } from "../core/users";
import { achievements } from "../system/achievements";

export const userAchievements = pgTable("user_achievements", {
  id: uuid("id").primaryKey().defaultRandom(),

  userId: uuid("user_id").references(() => user.id, {onDelete: "cascade",}).notNull(),

  achievementId: uuid("achievement_id").references(() => achievements.id, {onDelete: "cascade",}).notNull(),

  progress: integer("progress").default(0).notNull(),

  completed: boolean("completed").default(false).notNull(),
});