import {
  pgTable,
  uuid,
  text,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

import { reports } from "./reports";
import { images } from "../content/images";

export const reportDocumentTypeEnum = pgEnum(
  "report_document_type",
  [
    "Imagem",
    "Video",
    "Documento",
  ]
);

export const evidence = pgTable("evidence", {
  id: uuid("id").primaryKey().defaultRandom(),

  reportId: uuid("report_id").references(() => reports.id, {onDelete: "cascade",}).notNull(),

  imageId: uuid("image_id").references(() => images.id, {onDelete: "cascade",}),

  type: reportDocumentTypeEnum("type").notNull(),

  description: text("description").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});