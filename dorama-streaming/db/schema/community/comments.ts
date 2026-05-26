import {
pgTable,
uuid,
text,
timestamp,
} from "drizzle-orm/pg-core";

import { user } from "../core/users";

export const comments = pgTable("comments", {
    id: uuid("id").primaryKey().defaultRandom(),

    userId: uuid("user_id").references(() => user.id, {onDelete: "cascade",}).notNull(),

    episodeId: uuid("episode_id").references(() => user.id, {onDelete: "cascade"}).notNull(),

    content: text("content").notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at").defaultNow().notNull(),

    deletedAt: timestamp("deleted_at"),

    deletedById: uuid("deleted_by_id").references(() => user.id, {onDelete: "set null",}),

    status: text("status").default("active").notNull(),
});