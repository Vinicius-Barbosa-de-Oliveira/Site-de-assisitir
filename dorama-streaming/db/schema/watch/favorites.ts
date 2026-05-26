import {
  pgTable,
  uuid,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

import { user } from "../core/users";
import { dorama } from "../content/doramas";

export const favorites = pgTable(
  "favorites",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    userId: uuid("user_id").references(() => user.id, {onDelete: "cascade",}).notNull(),

    doramaId: uuid("dorama_id").references(() => dorama.id, {onDelete: "cascade",}).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    
  },
  (table) => ({
    uniqueFavorite: unique().on(
      table.userId,
      table.doramaId
    ),
  })
);