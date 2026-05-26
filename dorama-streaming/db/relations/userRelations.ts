import { relations } from "drizzle-orm";

import { user } from "@/db/schema/core/users";

import { favorites } from "@/db/schema";

import { continueWatching } from "@/db/schema";

export const userRelations = relations(
  user,
  ({ many }) => ({
    favorites: many(favorites),

    watching: many(continueWatching),
  })
);