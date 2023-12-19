import { AnyPgColumn, integer, pgTable, varchar } from "drizzle-orm/pg-core";
import {
  BrandedID,
  buildIsValidFunc,
  defaultTimestamps,
  prefixedUlid,
} from "../utils";
import { z } from "zod";
import { client, clientID } from "./client";
import { membershipType, membershipTypeID } from "./membership-type";
import { relations } from "drizzle-orm";

export const discountPrefix = "dsc";

export type discountID = BrandedID<"discountID">;

export const isDiscountID = buildIsValidFunc<discountID>(discountPrefix);

export const discount = pgTable("discount", {
  id: prefixedUlid(discountPrefix).$type<discountID>(),

  percentage: integer("percentage").notNull(),
  flatValue: integer("flatValue").notNull(),

  clientId: varchar("clientId")
    .$type<clientID>()
    .references((): AnyPgColumn => client.id),
  membershipTypeId: varchar("membershipTypeId")
    .$type<membershipTypeID>()
    .references((): AnyPgColumn => membershipType.id),

  ...defaultTimestamps,
});

export const discountRelations = relations(discount, ({ one }) => ({
  client: one(client, {
    fields: [discount.clientId],
    references: [client.id],
  }),
  membershipType: one(membershipType, {
    fields: [discount.membershipTypeId],
    references: [membershipType.id],
  }),
}));

export const zDiscountID = z
  .custom<discountID>()
  .refine((value) => isDiscountID(value));
