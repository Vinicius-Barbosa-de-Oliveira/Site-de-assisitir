import {
  pgTable,
  uuid,
  timestamp,
} from "drizzle-orm/pg-core";

import { user } from "../core/users";
import { episode } from "../content/episodes";

export const episodeViews = pgTable(
  "episode_views",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    userId: uuid("user_id").references(() => user.id, {onDelete: "set null",}),

    episodeId: uuid("episode_id").references(() => episode.id, {onDelete: "cascade",}).notNull(),

    watchedAt: timestamp("watched_at").defaultNow().notNull(),
  }
);