 import { relations } from "drizzle-orm";

import { episode, images } from "@/db/schema";
import { dorama } from "@/db/schema";

export const imageRelations = relations(images, ({ many }) => ({
  covers: many(dorama, {
    relationName: "coverImage",
  }),

  banners: many(dorama, {
    relationName: "bannerImage",
  }),

  thumbnail: many(episode),
}));