import {
    pgTable,
    uuid,
    pgEnum,
    unique,
} from "drizzle-orm/pg-core";
import { dorama } from "../content/doramas";
import { Staff } from "../content/staff";

export const staffEnum =
  pgEnum("staff_role", [
    "Ator Principal",
    "Ator Secundário",
    "Diretor",
    "Roteirista",
    "Produtor",
    "Compositor",
    "Cinematógrafo",
    "Editor",
    "Designer de Produção",
]);

export const doramaStaff = pgTable("DoramaStaff", {
    id: uuid("id").primaryKey().defaultRandom(),

    dorama_Id: uuid("doramaId").references(() => dorama.id, {onDelete: "cascade"}),

    staff_Id: uuid("staffId").references(() => Staff.id, {onDelete: "cascade"}),

    role: staffEnum("staff_role").notNull(),
},
    (table) => ({
        uniqueDoramaStaff: unique().on(
            table.dorama_Id,
            table.staff_Id,
            table.role
        ),
    })
);