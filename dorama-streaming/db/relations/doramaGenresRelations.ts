// db/relations/doramaGenresRelations.ts

import { relations } from "drizzle-orm";

import {
  doramaGenres,
  dorama,
  genre,
} from "@/db/schema";

export const doramaGenresRelations =
  relations(
    doramaGenres,
    ({ one }) => ({
      dorama: one(dorama, {
        fields: [
          doramaGenres.doramaId,
        ],

        references: [
          dorama.id,
        ],
      }),

      genre: one(genre, {
        fields: [
          doramaGenres.genreId,
        ],

        references: [
          genre.id,
        ],
      }),
    })
  );