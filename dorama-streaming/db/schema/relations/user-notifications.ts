import {
  pgTable,
  uuid,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

import { user } from "../core/users";
import { notification } from "../community/notifications";

export const userNotifications = pgTable("user_notifications", {
  id: uuid("id").primaryKey().defaultRandom(),

  userId: uuid("user_id").references(() => user.id, {onDelete: "cascade",}).notNull(),

  notificationId: uuid("notification_id").references(() => notification.id, {onDelete: "cascade",}).notNull(),

  read: boolean("read").default(false).notNull(),

  readAt: timestamp("read_at"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});