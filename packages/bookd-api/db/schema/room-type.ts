import { pgTable, varchar } from "drizzle-orm/pg-core";
import {
  BrandedID,
  buildIsValidFunc,
  defaultTimestamps,
  prefixedUlid,
} from "../utils";
import { z } from "zod";
import { relations } from "drizzle-orm";
import { room } from "./room";
import { membershipType } from "./membership-type";

export const roomTypePrefix = "rmtyp";

export type roomTypeID = BrandedID<"roomTypeID">;

export const isRoomTypeID = buildIsValidFunc<roomTypeID>(roomTypePrefix);

export const roomType = pgTable("roomType", {
  id: prefixedUlid(roomTypePrefix).$type<roomTypeID>(),

  name: varchar("name").notNull(),

  ...defaultTimestamps,
});

export const roomTypeRelations = relations(roomType, ({ many }) => ({
  rooms: many(room),
  membershipTypes: many(membershipType),
}));

export const zRoomTypeID = z
  .custom<roomTypeID>()
  .refine((value) => isRoomTypeID(value));
