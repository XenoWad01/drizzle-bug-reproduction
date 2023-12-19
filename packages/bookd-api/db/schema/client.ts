import { AnyPgColumn, pgTable, varchar } from "drizzle-orm/pg-core";
import {
  BrandedID,
  buildIsValidFunc,
  defaultTimestamps,
  prefixedUlid,
} from "../utils";
import { z } from "zod";
import { relations } from "drizzle-orm";
import { membership } from "./membership";
import { discount, discountID } from "./discount";
import { pet } from "./pet";
import { user, userID } from "./user";
import { booking } from "./booking";
import { bookingSnapshot } from "./booking-snapshot";
import { historyItem } from "./history-item";

export const clientPrefix = "cnt";

export type clientID = BrandedID<"clientID">;

export const isClientID = buildIsValidFunc<clientID>(clientPrefix);

export const client = pgTable("client", {
  id: prefixedUlid(clientPrefix).$type<clientID>(),

  note: varchar("note"),

  discountId: varchar("discountId")
    .$type<discountID>()
    .references(() => discount.id),
  userId: varchar("userId")
    .$type<userID>()
    .notNull()
    .references((): AnyPgColumn => user.id),

  ...defaultTimestamps,
});

export const clientRelations = relations(client, ({ one, many }) => ({
  discount: one(discount, {
    fields: [client.discountId],
    references: [discount.id],
  }),
  membership: many(membership),
  pets: many(pet),
  bookings: many(booking),
  user: one(user, {
    fields: [client.userId],
    references: [user.id],
  }),
  bookingSnapshots: many(bookingSnapshot),
  historyItems: many(historyItem),
}));

export const zClientID = z
  .custom<clientID>()
  .refine((value) => isClientID(value));
