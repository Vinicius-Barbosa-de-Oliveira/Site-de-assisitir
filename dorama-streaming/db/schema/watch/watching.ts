import {
  pgTable,
  uuid,
  integer,
  timestamp,
  unique,
  boolean,
} from "drizzle-orm/pg-core";

import { user } from "../core/users";
import { episode } from "../content/episodes";

export const continueWatching = pgTable(
  "continue_watching",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    userId: uuid("user_id").references(() => user.id, {onDelete: "cascade",}).notNull(),

    episodeId: uuid("episode_id").references(() => episode.id, {onDelete: "cascade",}).notNull(),

    progressSeconds: integer("progress_seconds").default(0).notNull(),

    durationSeconds: integer("duration_seconds").notNull(),

    completed: boolean("completed").default(false).notNull(),

    startedAt: timestamp("started_at").defaultNow().notNull(),

    lastWatchedAt: timestamp("last_watched_at").defaultNow().notNull(),
  },
  (table) => ({
    uniqueContinueWatching: unique().on(
      table.userId,
      table.episodeId
    ),
  })
);