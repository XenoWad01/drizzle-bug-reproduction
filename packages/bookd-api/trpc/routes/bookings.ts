import { z } from "zod";
import { publicProcedure } from "../procedures";
import { router } from "../config";
import { db } from "../../db/drizzle";
import { user } from "../../db/schema/user";



export const bookingsRouter = router({
  getBookings: publicProcedure.input(z.string()).query(async ({ ctx }) => {

    console.log('ctx.db.query', db.query) // prints {} at runtime
    console.log('ctx.db.query.user', ctx.db.query.user) // undefined at runtime
    // const foundUsers = await ctx.db.query.user.findMany({ // query is {} so this will error
    //   limit: 2
    // })  
    const foundUsers = await ctx.db.select().from(user) // WORKS, all good, returns users


    return {
      result: foundUsers,
    };
  }),
});
