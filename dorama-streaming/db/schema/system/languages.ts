import {
    pgTable,
    uuid,
    text,
    timestamp,
} from "drizzle-orm/pg-core";

export const language = pgTable("Language", {

    id: uuid("id").primaryKey().defaultRandom(),

    name: text("name").unique().notNull(),

    code: text("code").unique().notNull(),

    createdAt: timestamp("createdAt").defaultNow(),

    updatedAt: timestamp("updatedAt").defaultNow(),

});