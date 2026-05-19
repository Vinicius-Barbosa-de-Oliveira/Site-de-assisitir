import {
    pgTable,
    uuid,
    unique,
} from "drizzle-orm/pg-core";
import { dorama } from "../content/doramas";
import { genres } from "../content/genres";

export const doramaGenres = pgTable("DoramaGenre", {
    id: uuid("id").primaryKey().defaultRandom(),

    dorama_Id: uuid("doramaId").references(() => dorama.id, {onDelete: "cascade"}),

    genre_Id: uuid("genreId").references(() => genres.id, {onDelete: "cascade"}),
},
    (table) => ({
        uniqueDoramaGenre: unique().on(
            table.dorama_Id,
            table.genre_Id
        ),
    })

);