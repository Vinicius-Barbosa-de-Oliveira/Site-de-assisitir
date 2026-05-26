// db/relations/favorites.ts

import { relations } from "drizzle-orm";

import {
  user,
  favorites,
  dorama,
} from "@/db/schema";

export const favoritesRelations =
  relations(
    favorites,
    ({ one }) => ({
      user: one(user, {
        fields: [favorites.userId],
        references: [user.id],
      }),

      dorama: one(dorama, {
        fields: [favorites.doramaId],
        references: [dorama.id],
      }),
    })
  );
