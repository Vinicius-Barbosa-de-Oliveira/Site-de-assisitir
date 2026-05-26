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

    createdAt: timestamp("created_At").defaultNow(),

    updatedAt: timestamp("updated_At").defaultNow(),

});