import {
  pgTable,
  uuid,
  unique,
} from "drizzle-orm/pg-core";

import { users } from "../core/users";
import { posts } from "../community/posts";

export const postLikes = pgTable(
  "post_likes",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    userId: uuid("user_id")
      .references(() => users.id, {
        onDelete: "cascade",
      })
      .notNull(),

    postId: uuid("post_id")
      .references(() => posts.id, {
        onDelete: "cascade",
      })
      .notNull(),
  },
  (table) => ({
    uniqueLike: unique().on(
      table.userId,
      table.postId
    ),
  })
);