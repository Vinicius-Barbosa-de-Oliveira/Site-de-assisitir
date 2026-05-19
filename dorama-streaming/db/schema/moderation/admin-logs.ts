import {
  pgTable,
  uuid,
  text,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

import { user } from "../core/users";

export const adminLogActionEnum = pgEnum("admin_log_action", [
  "Banir Usuário","Desbanir Usuário",
  "Silenciar Usuário","Desilenciar Usuário",
  "Suspender Usuário","Restaurar Usuário",
  "Editar Mensagem","Deletar Mensagem",
  "Editar Postagem","Deletar Postagem",
  "Editar Comentário","Deletar Comentário",
]);

export const adminLogs = pgTable("admin_logs", {
  id: uuid("id").primaryKey().defaultRandom(),

  adminId: uuid("admin_id")
    .references(() => user.id, {
      onDelete: "set null",
    }),

  targetId: uuid("target_id"),

  action: adminLogActionEnum("action")
    .notNull(),

  details: text("details"),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});