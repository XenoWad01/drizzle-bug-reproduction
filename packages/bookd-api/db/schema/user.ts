import { AnyPgColumn, boolean, pgTable, varchar } from "drizzle-orm/pg-core";
import {
  BrandedID,
  buildIsValidFunc,
  defaultTimestamps,
  prefixedUlid,
} from "../utils";
import { z } from "zod";
import { relations } from "drizzle-orm";
import { client, clientID } from "./client";
import { session } from "./session";

export const userPrefix = "usr";

export type userID = BrandedID<"userID">;

export const isUserID = buildIsValidFunc<userID>(userPrefix);

export const user = pgTable("user", {
  id: prefixedUlid(userPrefix).$type<userID>(),

  email: varchar("email").unique().notNull(),
  phone: varchar("phone").unique().notNull(),
  password: varchar("password").notNull(),
  name: varchar("name").notNull(),
  isAdmin: boolean("isAdmin").default(false).notNull(),

  clientId: varchar("clientId")
    .$type<clientID>()
    .references((): AnyPgColumn => client.id),

  ...defaultTimestamps,
});

// TODO !!!!!!add these as exports to all files
export type UserInsert = typeof user.$inferInsert;
export type UserSelect = typeof user.$inferSelect;

export const userRelations = relations(user, ({ one, many }) => ({
  client: one(client, {
    fields: [user.clientId],
    references: [client.id],
  }),
  sessions: many(session)
}));

export const zUserID = z.custom<userID>().refine((value) => isUserID(value));
