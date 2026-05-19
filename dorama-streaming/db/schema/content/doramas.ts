import {
  pgTable,
  text,
  integer,
  real,
  timestamp,
  time,
  uuid,
  pgEnum,
} from "drizzle-orm/pg-core";
import { images } from "./images";

export const doramaStatus = pgEnum("dorama_status", [
    "Em Lançamento",
    "Completo",
    "Em Hiato",
    "Cancelado",
    "Em breve",
]);

export const weekDayEnum = pgEnum(
  "week_day",
  [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo",
  ]
);

export const dorama = pgTable("Dorama", {

  id: uuid("id").primaryKey().defaultRandom(),

  title: text("title").notNull(),

  slug: text("slug").unique().notNull(),

  description: text("description").notNull(),

  cover_Image: uuid("coverImage").references(() => images.id, {onDelete: "set null"}).notNull(),

  banner_Image: uuid("bannerImage").references(() => images.id, {onDelete: "set null"}).notNull(),

  trailer_Url: text("trailerUrl"),

  country: text("country").notNull(),

  year: integer("year").notNull(),

  status: doramaStatus("status").notNull(),

  scheduleDay: weekDayEnum("scheduleDay"),

  scheduleTime: time("scheduleTime"),

  created_At: timestamp("createdAt").defaultNow(),

  updated_At: timestamp("updatedAt").defaultNow(),

  viewsCount: integer("views_count").default(0).notNull(),

  favoritesCount: integer("favorites_count").default(0).notNull(),

  ratingsCount: integer("ratings_count").default(0).notNull(),

  averageRating: real("average_rating").default(0).notNull(),

  watchTimeMinutes: integer("watch_time_minutes").default(0).notNull(),
});