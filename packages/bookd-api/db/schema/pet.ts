import { pgTable, varchar } from "drizzle-orm/pg-core";
import {
  BrandedID,
  buildIsValidFunc,
  defaultTimestamps,
  prefixedUlid,
} from "../utils";
import { z } from "zod";
import { relations } from "drizzle-orm";
import { client, clientID } from "./client";
import { petOnBooking } from "./pet-on-booking";

export const petPrefix = "pet";

export type petID = BrandedID<"petID">;

export const isPetID = buildIsValidFunc<petID>(petPrefix);

export const pet = pgTable("pet", {
  id: prefixedUlid(petPrefix).$type<petID>(),

  name: varchar("name").notNull(),
  breed: varchar("breed"),
  note: varchar("note"),

  clientId: varchar("clientId")
    .$type<clientID>()
    .notNull()
    .references(() => client.id),

  ...defaultTimestamps,
});

export const petRelations = relations(pet, ({ one, many }) => ({
  client: one(client, {
    fields: [pet.clientId],
    references: [client.id],
  }),
  roomBookings: many(petOnBooking),
}));

export const zPetID = z.custom<petID>().refine((value) => isPetID(value));
