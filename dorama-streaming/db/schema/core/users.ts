import {
  pgTable,
  text,
  timestamp,
  pgEnum,
  uuid,
} from "drizzle-orm/pg-core";
import { images } from "../content/images";

export const userEnum =
  pgEnum("Role", [
    "USER",
    "ADMIN",
    "SUPER_ADMIN",
    "MODERATOR",
    "GUEST",
    "EDITOR",
    "CONTRIBUTOR",
    "VIEWER",
    "MEMBER",
  ]);

export const user =
  pgTable("User", {

    id: uuid("id").primaryKey().defaultRandom(),

    userName: text("user_name").unique().notNull(),

    name: text("name").notNull(),

    email: text("email").unique().notNull(),

    password: text("password").notNull(),

    profilePicture: uuid("profile_picture").references(() => images.id, {onDelete: "set null",}),

    banner: uuid("banner").references(() => images.id, {onDelete: "set null",}),

    role: userEnum("role").default("USER"),

    createdAt: timestamp("created_At").defaultNow(),

  });