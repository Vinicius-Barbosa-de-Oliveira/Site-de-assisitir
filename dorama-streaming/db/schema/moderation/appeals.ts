import {
  pgTable,
  uuid,
  text,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

import { punishments } from "./punishments";
import { user } from "../core/users";

export const appealStatusEnum = pgEnum("appeal_status", [
  "Pendente",
  "Aprovado",
  "Rejeitado",
]);

export const appeals = pgTable("appeals", {
  id: uuid("id").primaryKey().defaultRandom(),

  punishmentId: uuid("punishment_id").references(() => punishments.id, {onDelete: "cascade",}).notNull(),

  userId: uuid("user_id").references(() => user.id, {onDelete: "cascade",}).notNull(),

  reason: text("reason").notNull(),

  status: appealStatusEnum("status").default("Pendente").notNull(),

  reviewedBy: uuid("reviewed_by").references(() => user.id, {onDelete: "set null",}),

  response: text("response"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});