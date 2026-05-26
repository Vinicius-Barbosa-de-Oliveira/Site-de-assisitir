import { relations } from "drizzle-orm";

import {
    user,
    episode,
    continueWatching
} from "@/db/schema";


export const watchingRelations =
  relations(
    continueWatching,
    ({ one }) => ({
      user: one(user, {
        fields: [continueWatching.userId],
        references: [user.id],
      }),

      episode: one(episode, {
        fields: [continueWatching.episodeId],
        references: [episode.id],
      }),
    })
  );