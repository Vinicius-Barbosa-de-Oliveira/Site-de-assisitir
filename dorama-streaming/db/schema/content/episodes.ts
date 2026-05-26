import {
  pgTable,
  uuid,
  text,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

import { season } from "./seasons";
import { images } from "./images";

export const episode =
  pgTable("episode", {

    id: uuid("id").primaryKey().defaultRandom(),

    seasonId: uuid("season_id").references(() => season.id, { onDelete: "cascade" }).notNull(),

    number: integer("number").notNull(),

    title: text("title").notNull(),

    description: text("description"),

    thumbnail: uuid("thumbnail").references(() => images.id, {onDelete: "set null",}),

    duration: integer("duration").notNull(),

    releaseDate: timestamp("releaseDate").notNull(),

    createdAt: timestamp("createdAt").defaultNow(),

    updatedAt: timestamp("updatedAt").defaultNow(),
  }
);
