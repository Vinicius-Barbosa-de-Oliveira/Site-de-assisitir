import { relations } from "drizzle-orm";

import { dorama } from "@/db/schema";
import { season } from "@/db/schema";
import { episode } from "@/db/schema";

export const seasonsRelations = relations(season, ({ one, many }) => ({
  dorama: one(dorama, {
    fields: [season.doramaId],
    references: [dorama.id],
  }),

  episodes: many(episode),
}));