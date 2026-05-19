import {
pgTable,
uuid,
text,
timestamp,
integer,
} from "drizzle-orm/pg-core";

import { user } from "../core/users";
import { posts } from "./posts";

export const comments = pgTable("comments", {
    id: uuid("id").primaryKey().defaultRandom(),

    userId: uuid("user_id").references(() => user.id, {onDelete: "cascade",}).notNull(),

    postId: uuid("post_id").references(() => posts.id, {onDelete: "cascade",}).notNull(),

    parentCommentId: uuid("parent_comment_id"),

    content: text("content").notNull(),

    likesCount: integer("likes_count").default(0).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at").defaultNow().notNull(),

    deletedAt: timestamp("deleted_at"),

    deletedById: uuid("deleted_by_id").references(() => user.id, {onDelete: "set null",}),

    status: text("status").default("active").notNull(),
});