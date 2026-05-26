import {
    pgTable,
    uuid,
    pgEnum,
    unique,
} from "drizzle-orm/pg-core";
import { dorama } from "../content/doramas";
import { Staff } from "../content/staffs";

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

    doramaId: uuid("doramaId").references(() => dorama.id, {onDelete: "cascade"}),

    staffId: uuid("staffId").references(() => Staff.id, {onDelete: "cascade"}),

    role: staffEnum("staff_role").notNull(),
},
    (table) => ({
        uniqueDoramaStaff: unique().on(
            table.doramaId,
            table.staffId,
            table.role
        ),
    })
);