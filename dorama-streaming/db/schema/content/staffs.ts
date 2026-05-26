import {
    pgTable,
    uuid,
    text,
    timestamp,
} from "drizzle-orm/pg-core";
export const Staff = pgTable("Staff", {
    id: uuid("id").primaryKey().defaultRandom(),

    name: text("name").notNull(),
    
    age: text("age"),
    
    dateOfBirth: text("dateOfBirth"),

    nacionalitie: text("nacionalitie"),

    createdAt: timestamp("created_At").defaultNow(),   
});