// db/relations/genreRelations.ts

import { relations } from "drizzle-orm";

import {
  genre,
  doramaGenres,
} from "@/db/schema";

export const genreRelations =
  relations(
    genre,
    ({ many }) => ({
      doramas:
        many(doramaGenres),
    })
  );