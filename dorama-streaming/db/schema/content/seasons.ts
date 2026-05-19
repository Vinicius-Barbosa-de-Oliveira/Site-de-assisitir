import {
    pgTable,
    uuid,
    text,
    integer,
    timestamp,
    pgEnum,
} from "drizzle-orm/pg-core";

export const SeasonStatus = pgEnum("season_status", [
    "Em Lançamento",
    "Completo",
    "Em Hiato",
    "Cancelado",
    "Em breve",
]);

export const seasons = pgTable("seasons", {
    id: uuid("id").primaryKey().defaultRandom(),

    dorama_id: uuid("dorama_id").notNull(),

    season_number: integer("season_number").notNull(),

    title: text("title").notNull(),

    description: text("description").notNull(),

    status: SeasonStatus("status").notNull(),

    created_at: timestamp("created_at").defaultNow().notNull(),

    number_of_episodes: integer("number_of_episodes").notNull(),    
});