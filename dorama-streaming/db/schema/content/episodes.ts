import {
  pgTable,
  uuid,
  text,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

import { seasons } from "./seasons";
import { images } from "./images";

export const episodes =
  pgTable("Episode", {

    id: uuid("id").primaryKey().defaultRandom(),

    season_Id: uuid("season_id").references(() => seasons.id, { onDelete: "cascade" }),

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
