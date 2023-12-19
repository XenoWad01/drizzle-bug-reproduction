import { pgTable, integer, varchar } from "drizzle-orm/pg-core";
import {
  BrandedID,
  buildIsValidFunc,
  defaultTimestamps,
  prefixedUlid,
} from "../utils";
import { z } from "zod";
import { relations } from "drizzle-orm";

import { roomType, roomTypeID } from "./room-type";
import { petOnBooking } from "./pet-on-booking";

export const roomPrefix = "rm";

export type roomID = BrandedID<"roomID">;

export const isRoomID = buildIsValidFunc<roomID>(roomPrefix);

export const room = pgTable("room", {
  id: prefixedUlid(roomPrefix).$type<roomID>(),

  name: varchar("name").unique().notNull(),
  roomNumber: integer("roomNumber").unique().notNull(),
  maxPetCount: integer("maxPetCount").notNull(),
  roomColor: varchar("roomColor").notNull(), // hex
  note: varchar("note"),
  price: integer("price").notNull(),

  roomTypeId: varchar("roomTypeId")
    .$type<roomTypeID>()
    .notNull()
    .references(() => roomType.id),

  ...defaultTimestamps,
});

export const roomRelations = relations(room, ({ one, many }) => ({
  roomType: one(roomType, {
    fields: [room.roomTypeId],
    references: [roomType.id],
  }),
  petBookings: many(petOnBooking),
}));

export const zRoomID = z.custom<roomID>().refine((value) => isRoomID(value));
