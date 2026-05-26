import {
  pgTable,
  uuid,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { images } from "../content/images";

export const badges = pgTable("badges", {
  id: uuid("id").primaryKey().defaultRandom(),

  name: text("name").unique().notNull(),

  description: text("description"),

  imageId: uuid("image_id").references(() => images.id, {onDelete: "set null",}),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});