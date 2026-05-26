import { relations } from "drizzle-orm";

import {
  dorama,
  images,
  season,
  doramaGenres,
  favorites
} from "@/db/schema";

export const doramaRelations = relations(
  dorama,
  ({ one, many }) => ({
    coverImage: one(images, {
      fields: [dorama.coverImageId],
      references: [images.id],
    }),

    bannerImage: one(images, {
      fields: [dorama.bannerImageId],
      references: [images.id],
    }),

    seasons: many(season),

    genres: many(doramaGenres),

    favorites: many(favorites),
  })
);