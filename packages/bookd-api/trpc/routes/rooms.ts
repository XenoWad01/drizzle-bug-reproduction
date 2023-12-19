import { z } from "zod";
import { publicProcedure } from "../procedures";
import { router } from "../config";

export const roomsRouter = router({
  helloRooms: publicProcedure
    .input(z.object({ message: z.string() }))
    .mutation(({ input }) => {
      return {
        result: input.message,
      };
    }),
});
