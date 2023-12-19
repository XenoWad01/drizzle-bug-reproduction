import { pgTable, varchar } from "drizzle-orm/pg-core";
import {
  BrandedID,
  buildIsValidFunc,
  defaultTimestamps,
  prefixedUlid,
} from "../utils";
import { z } from "zod";
import { relations } from "drizzle-orm";

import { client, clientID } from "./client";

export const historyItemPrefix = "htitm";

export type historyItemID = BrandedID<"historyItemID">;

export const isHistoryItemID =
  buildIsValidFunc<historyItemID>(historyItemPrefix);

export const historyItem = pgTable("historyItem", {
  id: prefixedUlid(historyItemPrefix).$type<historyItemID>(),

  entityName: varchar("entityName").notNull(),
  entityId: varchar("entityId").notNull(),

  clientId: varchar("clientId")
    .$type<clientID>()
    .notNull()
    .references(() => client.id),

  ...defaultTimestamps,
});

export const historyItemRelations = relations(historyItem, ({ one }) => ({
  client: one(client, {
    fields: [historyItem.clientId],
    references: [client.id],
  }),
}));

export const zHistoryItemID = z
  .custom<historyItemID>()
  .refine((value) => isHistoryItemID(value));
