import {
  pgTable,
  uuid,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

import { users } from "../core/users";
import { notifications } from "../community/notifications";

export const userNotifications = pgTable("user_notifications", {
  id: uuid("id").primaryKey().defaultRandom(),

  userId: uuid("user_id")
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),

  notificationId: uuid("notification_id")
    .references(() => notifications.id, {
      onDelete: "cascade",
    })
    .notNull(),

  read: boolean("read")
    .default(false)
    .notNull(),

  readAt: timestamp("read_at"),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});