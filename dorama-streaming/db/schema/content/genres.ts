import {
  pgTable,
  uuid,
  text,
} from "drizzle-orm/pg-core";

export const genres =
  pgTable("Genre", {

    id: uuid("id").primaryKey().defaultRandom(),

    name: text("name").unique().notNull(),

    description: text("description"),

  });