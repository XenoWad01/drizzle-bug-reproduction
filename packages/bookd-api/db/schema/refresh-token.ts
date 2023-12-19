import { pgTable, varchar } from "drizzle-orm/pg-core";
import {
  BrandedID,
  buildIsValidFunc,
  defaultTimestamps,
  prefixedUlid,
} from "../utils";
import { z } from "zod";
import { relations } from "drizzle-orm";

import { session, sessionID } from "./session";

export const refreshTokenPrefix = "rtk";

export type refreshTokenID = BrandedID<"refreshTokenID">;

export const isRefreshTokenID = buildIsValidFunc<refreshTokenID>(refreshTokenPrefix);

export const refreshToken = pgTable("refreshToken", {
  id: prefixedUlid(refreshTokenPrefix).$type<refreshTokenID>(),

  token: varchar("token").unique().notNull(),

  sessionId: varchar("sessionId")
    .$type<sessionID>()
    .notNull()
    .references(() => session.id, { onDelete: 'cascade' }),

  ...defaultTimestamps,
});

export const refreshTokenRelations = relations(refreshToken, ({ one }) => ({
  session: one(session, {
    fields: [refreshToken.sessionId],
    references: [session.id],
  }),
}));

export const zRefreshTokenID = z
  .custom<refreshTokenID>()
  .refine((value) => isRefreshTokenID(value));
