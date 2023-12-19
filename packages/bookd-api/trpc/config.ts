import { initTRPC } from "@trpc/server";

import { Context } from "./context";

export const t = initTRPC.context<Context>().create({
    errorFormatter(opts) {
        const { shape, error } = opts;
        console.error(error)
        return {
          ...shape,
          data: {
            ...shape.data,
            // zodError:
            //   error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
            //     ? error?.cause.flatten()
            //     : null,
          },
        };
      },
});

export const publicProcedure = t.procedure;

// export const authorizedProcedure = publicProcedure
//   .use((opts) => {
//     if (!opts.ctx?.user) {
//       throw new TRPCError({
//         code: 'FORBIDDEN',
//         message: "We don't take kindly to out-of-town folk",
//       });
//     }

//     return opts.next();
//   });

export const router = t.router;
