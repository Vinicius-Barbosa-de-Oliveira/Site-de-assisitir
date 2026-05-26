import {
    pgTable,
    uuid,
    unique,
} from "drizzle-orm/pg-core";
import { dorama } from "../content/doramas";
import { genre } from "../content/genres";

export const doramaGenres = pgTable("DoramaGenre", {
    id: uuid("id").primaryKey().defaultRandom(),

    doramaId: uuid("doramaId").references(() => dorama.id, {onDelete: "cascade"}),

    genreId: uuid("genreId").references(() => genre.id, {onDelete: "cascade"}),
},
    (table) => ({
        uniqueDoramaGenre: unique().on(
            table.doramaId,
            table.genreId
        ),
    })
);