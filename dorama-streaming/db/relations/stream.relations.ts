import { relations } from "drizzle-orm";

import { stream, episode } from "@/db/schema";

export const streamRelations = relations(stream, ({ one }) => ({
  episode: one(episode, {
    fields: [stream.episodeId],
    references: [episode.id],
  }),
}));