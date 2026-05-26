import {
  pgTable,
  text,
  integer,
  timestamp,
  time,
  uuid,
  pgEnum,
} from "drizzle-orm/pg-core";

import { images } from "./images";

export const doramaStatus = pgEnum(
  "dorama_status",
  [
    "Em Lançamento",
    "Completo",
    "Em Hiato",
    "Cancelado",
    "Em breve",
  ]
);

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

export const dorama = pgTable(
  "dorama",
  {
    id: uuid("id")
      .primaryKey()
      .defaultRandom(),

    title: text("title")
      .notNull(),

    slug: text("slug")
      .unique()
      .notNull(),

    description: text("description")
      .notNull(),

    coverImageId: uuid(
      "cover_image_id"
    )
      .references(() => images.id, {
        onDelete: "set null",
      })
      .notNull(),

    bannerImageId: uuid(
      "banner_image_id"
    )
      .references(() => images.id, {
        onDelete: "set null",
      })
      .notNull(),

    trailer: text("trailer_url"),

    country: text("country")
      .notNull(),

    year: integer("year")
      .notNull(),

    status: doramaStatus("status")
      .notNull(),

    scheduleDay:
      weekDayEnum("schedule_day"),

    scheduleTime:
      time("schedule_time"),

    createdAt: timestamp(
      "created_at"
    ).defaultNow(),

    updatedAt: timestamp(
      "updated_at"
    ).defaultNow(),

    popularityScore: integer(
      "popularity_score"
    )
      .default(0)
      .notNull(),
  }
);