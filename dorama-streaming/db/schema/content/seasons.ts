import {
    pgTable,
    uuid,
    text,
    integer,
    timestamp,
    pgEnum,
} from "drizzle-orm/pg-core";
import { dorama } from "./doramas";

export const SeasonStatus = pgEnum("season_status", [
    "Em Lançamento",
    "Completo",
    "Em Hiato",
    "Cancelado",
    "Em breve",
]);

export const season = pgTable("season", {
    id: uuid("id").primaryKey().defaultRandom(),

    doramaId: uuid("dorama_id").references(() => dorama.id, { onDelete: "cascade" }).notNull(),

    number: integer("season_number").notNull(),

    title: text("title").notNull(),

    description: text("description").notNull(),

    status: SeasonStatus("status").notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    qtdEpisodes: integer("number_of_episodes").notNull(),    
});