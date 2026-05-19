import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  integer,
} from "drizzle-orm/pg-core";

import { user } from "../core/users";
import { images } from "../content/images";

export const posts = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom(),

  userId: uuid("user_id")
    .references(() => user.id, {
      onDelete: "cascade",
    })
    .notNull(),

  title: text("title"),

  content: text("content").notNull(),

  imageId: uuid("image_id")
    .references(() => images.id, {
      onDelete: "set null",
    }),

  spoiler: boolean("spoiler")
    .default(false)
    .notNull(),

  pinned: boolean("pinned")
    .default(false)
    .notNull(),

  locked: boolean("locked")
    .default(false)
    .notNull(),

  likesCount: integer("likes_count")
    .default(0)
    .notNull(),

  commentsCount: integer("comments_count")
    .default(0)
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});