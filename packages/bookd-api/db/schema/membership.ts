import {
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
import { membershipType, membershipTypeID } from "./membership-type";
import { client, clientID } from "./client";

export const membershipPrefix = "mb";

export type membershipID = BrandedID<"membershipID">;

export const isMembershipID = buildIsValidFunc<membershipID>(membershipPrefix);

export const membership = pgTable("membership", {
  id: prefixedUlid(membershipPrefix).$type<membershipID>(),

  startDate: timestamp("startDate").notNull(),
  endDate: timestamp("endDate").notNull(),
  availableDays: integer("availableDays").notNull(),
  isActive: boolean("isActive").notNull(),

  membershipTypeId: varchar("membershipTypeId")
    .$type<membershipTypeID>()
    .notNull()
    .references(() => membershipType.id),
  clientId: varchar("clientId")
    .$type<clientID>()
    .notNull()
    .references(() => client.id),

  ...defaultTimestamps,
});

export const membershipRelations = relations(membership, ({ one }) => ({
  membershipType: one(membershipType, {
    fields: [membership.membershipTypeId],
    references: [membershipType.id],
  }),
  client: one(client, {
    fields: [membership.clientId],
    references: [client.id],
  }),
}));

export const zMembershipID = z
  .custom<membershipID>()
  .refine((value) => isMembershipID(value));
