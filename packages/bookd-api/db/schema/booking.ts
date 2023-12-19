import {
  bigint,
  boolean,
  integer,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
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
import { status, statusID } from "./status";
import { bookingSnapshot } from "./booking-snapshot";
import { aditionalService } from "./aditional-service";

export const bookingPrefix = "bk";

export type bookingID = BrandedID<"bookingID">;

export const isBookingID = buildIsValidFunc<bookingID>(bookingPrefix);

export const zBookingID = z
  .custom<bookingID>()
  .refine((value) => isBookingID(value));

export const booking = pgTable("booking", {
  id: prefixedUlid(bookingPrefix).$type<bookingID>(),

  startDate: timestamp("startDate").notNull(),
  endDate: timestamp("endDate").notNull(),
  note: varchar("note"),
  upfrontPaymentDueAt: timestamp("upfrontPaymentDueAt").notNull(),
  upfrontPaymentPrice: integer("upfrontPaymentPrice").notNull(),
  isUpfrontPayed: boolean("isUpfrontPayed").default(false),
  isCheckInPayed: boolean("isCheckInPayed").default(false),
  publicId: bigint("bigserial", { mode: "number" }),

  // totalPrice: computed
  clientId: varchar("clientId")
    .$type<clientID>()
    .notNull()
    .references(() => client.id),
  statusId: varchar("statusId")
    .$type<statusID>()
    .notNull()
    .references(() => status.id),

  ...defaultTimestamps,
});

export const bookingRelations = relations(booking, ({ one, many }) => ({
  client: one(client, {
    fields: [booking.clientId],
    references: [client.id],
  }),
  petInRooms: many(petOnBooking),
  status: one(status, {
    fields: [booking.statusId],
    references: [status.id],
  }),
  aditionalServices: many(aditionalService),
  bookingSnapshots: many(bookingSnapshot),
}));
