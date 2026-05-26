import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

import { user } from "../core/users";
import { chat } from "./chats"

export const messages = pgTable("messages", {
    id: uuid("id").primaryKey().defaultRandom(),

    userId: uuid("user_id").references(() => user.id, {onDelete: "cascade",}).notNull(),

    chatId: uuid("Chat").references(() => chat.id, {onDelete: "cascade",}).notNull(),

    content: text("content").notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at").defaultNow().notNull(),

    deletedAt: timestamp("deleted_at"),

    deletedById: uuid("deleted_by_id").references(() => user.id, {onDelete: "set null",}),

    status: text("status").default("active").notNull(),
});