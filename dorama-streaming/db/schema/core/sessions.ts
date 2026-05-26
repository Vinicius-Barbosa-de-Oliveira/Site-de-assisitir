import {
  pgTable,
  uuid,
  text,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

import { user } from "../core/users";
import { device } from "../core/devices";

export const session = pgTable("session", {
  id: uuid("id").primaryKey().defaultRandom(),

  userId: uuid("user_id").references(() => user.id, {onDelete: "cascade",}).notNull(),

  deviceId: uuid("device_id").references(() => device.id, {onDelete: "cascade",}).notNull(),

  token: text("token").notNull(),

  ipAddress: text("ip_address"),

  userAgent: text("user_agent"),

  expiresAt: timestamp("expires_at").notNull(),

  revoked: boolean("revoked").default(false).notNull(),

  lastLoginAt: timestamp("last_login_at").defaultNow().notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});