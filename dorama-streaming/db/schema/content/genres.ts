import {
  pgTable,
  uuid,
  text,
} from "drizzle-orm/pg-core";

export const genre =
  pgTable("Genre", {

    id: uuid("id").primaryKey().defaultRandom(),

    name: text("name").unique().notNull(),

    description: text("description"),

  });