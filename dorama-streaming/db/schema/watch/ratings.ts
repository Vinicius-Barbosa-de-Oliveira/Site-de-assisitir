import {
  pgTable,
  uuid,
  integer,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

import { user } from "../core/users";
import { dorama } from "../content/doramas";

export const ratings = pgTable(
  "ratings",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    userId: uuid("user_id").references(() => user.id, {onDelete: "cascade",}).notNull(),

    doramaId: uuid("dorama_id").references(() => dorama.id, {onDelete: "cascade",}).notNull(),

    rating: integer("rating").notNull(),

    review: text("review"),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    uniqueUserRating: unique().on(
      table.userId,
      table.doramaId
    ),
  })
);