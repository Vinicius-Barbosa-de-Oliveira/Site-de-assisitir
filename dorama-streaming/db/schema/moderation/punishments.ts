import {
  pgTable,
  uuid,
  text,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

import { user } from "../core/users";

export const punishmentTypeEnum = pgEnum("punishment_type", [
  "Alerta de Violação",
  "Mutar Usuário",
  "BAN",
  "Suspensão Temporária",
]);

export const punishmentStatusEnum = pgEnum("punishment_status", [
  "Ativo",
  "Expirado",
  "Removido",
]);

export const punishments = pgTable("punishments", {
  id: uuid("id").primaryKey().defaultRandom(),

  userId: uuid("user_id")
    .references(() => user.id, {
      onDelete: "cascade",
    })
    .notNull(),

  moderatorId: uuid("moderator_id")
    .references(() => user.id, {
      onDelete: "set null",
    }),

  type: punishmentTypeEnum("type")
    .notNull(),

  reason: text("reason")
    .notNull(),

  status: punishmentStatusEnum("status")
    .default("Ativo")
    .notNull(),

  expiresAt: timestamp("expires_at"),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});