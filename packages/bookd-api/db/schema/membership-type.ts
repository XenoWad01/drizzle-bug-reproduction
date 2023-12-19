import { boolean, integer, pgTable, varchar } from "drizzle-orm/pg-core";
import {
  BrandedID,
  buildIsValidFunc,
  defaultTimestamps,
  prefixedUlid,
} from "../utils";
import { z } from "zod";
import { relations } from "drizzle-orm";
import { discount, discountID } from "./discount";
import { roomType, roomTypeID } from "./room-type";
import { membership } from "./membership";

export const membershipTypePrefix = "mbtyp";

export type membershipTypeID = BrandedID<"membershipTypeID">;

export const isMembershipTypeID =
  buildIsValidFunc<membershipTypeID>(membershipTypePrefix);

export const membershipType = pgTable("membershipType", {
  id: prefixedUlid(membershipTypePrefix).$type<membershipTypeID>(),

  name: varchar("name").notNull(),
  availableDays: integer("availableDays").notNull(),
  isDisabled: boolean("isDisabled").notNull(),
  price: integer("price").notNull(),

  discountId: varchar("discountId")
    .$type<discountID>()
    .references(() => discount.id),
  roomTypeId: varchar("roomTypeId")
    .$type<roomTypeID>()
    .notNull()
    .references(() => roomType.id),

  ...defaultTimestamps,
});

export const membershipTypeRelations = relations(
  membershipType,
  ({ one, many }) => ({
    discount: one(discount, {
      fields: [membershipType.discountId],
      references: [discount.id],
    }),
    roomType: one(roomType, {
      fields: [membershipType.roomTypeId],
      references: [roomType.id],
    }),
    memberships: many(membership),
  }),
);

export const zMembershipTypeID = z
  .custom<membershipTypeID>()
  .refine((value) => isMembershipTypeID(value));
