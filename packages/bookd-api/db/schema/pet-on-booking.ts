import { pgTable, varchar } from "drizzle-orm/pg-core";
import {
  BrandedID,
  buildIsValidFunc,
  defaultTimestamps,
  prefixedUlid,
} from "../utils";
import { z } from "zod";
import { relations } from "drizzle-orm";
import { booking, bookingID } from "./booking";
import { room, roomID } from "./room";
import { pet, petID } from "./pet";

export const petOnBookingPrefix = "pob";

export type petOnBookingID = BrandedID<"petOnBookingID">;

export const isPetOnBookingID =
  buildIsValidFunc<petOnBookingID>(petOnBookingPrefix);

// Signifies that this pet will be in this room because of this booking from booking.start to booking.end

export const petOnBooking = pgTable("petOnBooking", {
  id: prefixedUlid(petOnBookingPrefix).$type<petOnBookingID>(),

  bookingId: varchar("bookingId")
    .$type<bookingID>()
    .notNull()
    .references(() => booking.id),
  roomId: varchar("roomId")
    .$type<roomID>()
    .notNull()
    .references(() => room.id),
  petId: varchar("petId")
    .$type<petID>()
    .notNull()
    .references(() => pet.id),

  ...defaultTimestamps,
});

export const petOnBookingRelations = relations(petOnBooking, ({ one }) => ({
  pet: one(pet, {
    fields: [petOnBooking.petId],
    references: [pet.id],
  }),
  booking: one(booking, {
    fields: [petOnBooking.bookingId],
    references: [booking.id],
  }),
  room: one(room, {
    fields: [petOnBooking.roomId],
    references: [room.id],
  }),
}));

export const zPetOnBookingID = z
  .custom<petOnBookingID>()
  .refine((value) => isPetOnBookingID(value));
