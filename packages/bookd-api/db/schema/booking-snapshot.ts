import {
  integer,
  pgTable,
  timestamp,
  varchar,
  boolean,
  json,
} from "drizzle-orm/pg-core";
import {
  BrandedID,
  buildIsValidFunc,
  defaultTimestamps,
  prefixedUlid,
} from "../utils";
import { z } from "zod";
import { relations } from "drizzle-orm";
import { booking, bookingID } from "./booking";
import { roomID } from "./room";
import { petOnBookingID } from "./pet-on-booking";
import { aditionalServiceID } from "./aditional-service";
import { client, clientID } from "./client";

export const bookingSnapshotPrefix = "bksnp";

export type bookingSnapshotID = BrandedID<"bookingSnapshotID">;

export const isBookingSnapshotID = buildIsValidFunc<bookingSnapshotID>(
  bookingSnapshotPrefix,
);

export const bookingSnapshot = pgTable("bookingSnapshot", {
  id: prefixedUlid(bookingSnapshotPrefix).$type<bookingSnapshotID>(),

  startDate: timestamp("startDate").notNull(),
  endDate: timestamp("endDate").notNull(),
  note: varchar("note"),
  snapshotFrom: timestamp("snapshotFrom").notNull(),
  userEmail: varchar("userEmail").notNull(),
  totalPrice: integer("totalPrice").notNull(), // comes from compute
  upfrontPaymentDueAt: timestamp("upfrontPaymentDueAt").notNull(),
  upfrontPaymentPrice: integer("upfrontPaymentPrice").notNull(),
  isUpfrontPayed: boolean("isUpfrontPayed"),

  petInRooms: json("petInRoom").$type<Array<petOnBookingID>>(),
  rooms: json("rooms").$type<Array<roomID>>(),
  status: varchar("status"),
  aditionalServices:
    json("aditionalServices").$type<Array<aditionalServiceID>>(),

  bookingId: varchar("bookingId")
    .$type<bookingID>()
    .notNull()
    .references(() => booking.id),
  clientId: varchar("clientId")
    .$type<clientID>()
    .notNull()
    .references(() => client.id),

  ...defaultTimestamps,
});

export const bookingSnapshotRelations = relations(
  bookingSnapshot,
  ({ one }) => ({
    booking: one(booking, {
      fields: [bookingSnapshot.bookingId],
      references: [booking.id],
    }),
    client: one(client, {
      fields: [bookingSnapshot.clientId],
      references: [client.id],
    }),
  }),
);

export const zBookingSnapshotID = z
  .custom<bookingSnapshotID>()
  .refine((value) => isBookingSnapshotID(value));
