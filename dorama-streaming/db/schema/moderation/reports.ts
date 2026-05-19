import {
  pgTable,
  uuid,
  text,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

import { user } from "../core/users";

export const reportTypeEnum = pgEnum("report_type", [
  "Postagem",
  "Comentário",
  "Mensagem",
  "Usuário",
]);

export const reportStatusEnum = pgEnum("report_status", [
  "Pendente",
  "Em Revisão",
  "Resolvido",
  "Rejeitado",
]);

export const reports = pgTable("reports", {
  id: uuid("id").primaryKey().defaultRandom(),

  reporterId: uuid("reporter_id").references(() => user.id, {onDelete: "cascade",}).notNull(),

  targetId: uuid("target_id").notNull(),

  targetType: reportTypeEnum("target_type").notNull(),

  reason: text("reason").notNull(),

  status: reportStatusEnum("status").default("Pendente").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});