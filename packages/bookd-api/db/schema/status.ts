import { pgTable, varchar } from "drizzle-orm/pg-core";
import {
  BrandedID,
  buildIsValidFunc,
  defaultTimestamps,
  prefixedUlid,
} from "../utils";
import { z } from "zod";
import { relations } from "drizzle-orm";
import { booking } from "./booking";

export const statusPrefix = "sts";

export type statusID = BrandedID<"statusID">;

export const isStatusID = buildIsValidFunc<statusID>(statusPrefix);

export const status = pgTable("status", {
  id: prefixedUlid(statusPrefix).$type<statusID>(),

  name: varchar("name").notNull(),
  color: varchar("color").notNull(),

  ...defaultTimestamps,
});

export const statusRelations = relations(status, ({ many }) => ({
  petBookings: many(booking),
}));

export const zStatusID = z
  .custom<statusID>()
  .refine((value) => isStatusID(value));
