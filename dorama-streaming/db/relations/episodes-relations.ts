import { relations } from "drizzle-orm";

import {
  episode,
  season,
  images,
  stream,
  continueWatching,
} from "@/db/schema";

export const episodesRelations =
  relations(episode, ({ one, many }) => ({
    season: one(season, {
      fields: [episode.seasonId],
      references: [season.id],
    }),

    thumbnail: one(images, {
      fields: [episode.thumbnail],
      references: [images.id],
    }),

    streams: many(stream),

    watching: many(continueWatching),
  }));