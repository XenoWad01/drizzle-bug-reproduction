import { boolean, pgTable, varchar } from "drizzle-orm/pg-core";
import {
  BrandedID,
  buildIsValidFunc,
  defaultTimestamps,
  prefixedUlid,
} from "../utils";
import { z } from "zod";
import { relations } from "drizzle-orm";
import { aditionalService, aditionalServiceID } from "./aditional-service";

export const taskPrefix = "tsk";

export type taskID = BrandedID<"taskID">;

export const isTaskID = buildIsValidFunc<taskID>(taskPrefix);

export const task = pgTable("task", {
  id: prefixedUlid(taskPrefix).$type<taskID>(),

  name: varchar("name").notNull(),
  done: boolean("done").default(false),
  note: varchar("note"),
  isExternal: boolean("isExternal").default(false).notNull(),

  aditionalServiceId: varchar("aditionalServiceId")
    .$type<aditionalServiceID>()
    .references(() => aditionalService.id),

  ...defaultTimestamps,
});

export const taskRelations = relations(task, ({ one }) => ({
  aditionalService: one(aditionalService, {
    fields: [task.aditionalServiceId],
    references: [aditionalService.id],
  }),
}));

export const zTaskID = z.custom<taskID>().refine((value) => isTaskID(value));
