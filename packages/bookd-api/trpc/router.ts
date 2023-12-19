import { router } from "./config";
import { bookingsRouter } from "./routes/bookings";
import { authRouter } from "./routes/auth";
import { roomsRouter } from "./routes";

export const appRouter = router({
  bookings: bookingsRouter,
  auth: authRouter,
  rooms: roomsRouter,
});

export type AppRouter = typeof appRouter;
