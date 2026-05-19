import {
  pgTable,
  uuid,
  unique,
} from "drizzle-orm/pg-core";

import { users } from "../core/users";
import { comments } from "../community/comments";

export const commentLikes = pgTable(
  "comment_likes",{
    id: uuid("id").primaryKey().defaultRandom(),

    userId: uuid("user_id")
      .references(() => users.id, {
        onDelete: "cascade",
      })
      .notNull(),

    commentId: uuid("comment_id")
      .references(() => comments.id, {
        onDelete: "cascade",
      })
      .notNull(),
  },
  (table) => ({
    uniqueLike: unique().on(
      table.userId,
      table.commentId
    ),
  })
);