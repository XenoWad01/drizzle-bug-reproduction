import { AnyPgColumn, pgTable, varchar } from "drizzle-orm/pg-core";
import {
  BrandedID,
  buildIsValidFunc,
  defaultTimestamps,
  prefixedUlid,
} from "../utils";
import { z } from "zod";
import { relations } from "drizzle-orm";
import { user, userID } from "./user";
import { refreshToken } from "./refresh-token";

export const sessionPrefix = "ses";

export type sessionID = BrandedID<"sessionID">;

export const isSessionID = buildIsValidFunc<sessionID>(sessionPrefix);

export const session = pgTable("session", {
  id: prefixedUlid(sessionPrefix).$type<sessionID>(),

  userAgent: varchar("userAgent"),

  userId: varchar("userId")
    .$type<userID>()
    .notNull()
    .references((): AnyPgColumn => user.id, { onDelete: 'cascade' }),
    
  ...defaultTimestamps,
});

export const sessionRelations = relations(session, ({ one, many }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
  refreshTokens: many(refreshToken)
}));

export const zSessionID = z
  .custom<sessionID>()
  .refine((value) => isSessionID(value));
