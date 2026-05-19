import{
    pgTable,
    integer,
    text,
    timestamp,
    uuid,
} from "drizzle-orm/pg-core";
export const images = pgTable("images", {
  id: uuid("id").primaryKey().defaultRandom(),

  url: text("url").notNull(),

  alt: text("alt"),

  width: integer("width"),
  
  height: integer("height"),

  sizeKb: integer("size_kb"),

  mimeType: text("mime_type"),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});