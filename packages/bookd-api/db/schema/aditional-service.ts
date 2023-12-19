import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import {
  BrandedID,
  buildIsValidFunc,
  defaultTimestamps,
  prefixedUlid,
} from "../utils";
import { z } from "zod";
import { relations } from "drizzle-orm";
import { task } from "./task";
import { booking, bookingID } from "./booking";

export const aditionalServicePrefix = "adsv";

export type aditionalServiceID = BrandedID<"aditionalServiceID">;

export const isAditionalServiceID = buildIsValidFunc<aditionalServiceID>(
  aditionalServicePrefix,
);

export const aditionalService = pgTable("aditionalService", {
  id: prefixedUlid(aditionalServicePrefix).$type<aditionalServiceID>(),

  serviceName: varchar("serviceName").notNull(),
  price: integer("price").notNull(), // bigint 13,55 => 1355

  bookingId: varchar("bookingId")
    .$type<bookingID>()
    .notNull()
    .references(() => booking.id),

  ...defaultTimestamps,
});

export const aditionalServiceRelations = relations(
  aditionalService,
  ({ one, many }) => ({
    tasks: many(task),
    booking: one(booking, {
      fields: [aditionalService.bookingId],
      references: [booking.id],
    }),
  }),
);

export const zAditionalServiceID = z
  .custom<aditionalServiceID>()
  .refine((value) => isAditionalServiceID(value));
