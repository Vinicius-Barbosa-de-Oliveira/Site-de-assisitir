import {
  pgTable,
  uuid,
  timestamp,
} from "drizzle-orm/pg-core";

import { users } from "../core/users";
import { episodes } from "../content/episodes";

export const episodeViews = pgTable(
  "episode_views",
  {
    id: uuid("id")
      .primaryKey()
      .defaultRandom(),

    userId: uuid("user_id")
      .references(() => users.id, {
        onDelete: "set null",
      }),

    episodeId: uuid("episode_id")
      .references(() => episodes.id, {
        onDelete: "cascade",
      })
      .notNull(),

    watchedAt: timestamp("watched_at")
      .defaultNow()
      .notNull(),
  }
);