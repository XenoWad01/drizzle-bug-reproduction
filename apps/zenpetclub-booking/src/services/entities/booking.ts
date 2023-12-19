import { trpc } from "../trpc";

export const useBookings = () => {
  const { data } = trpc.bookings.getBookings.useQuery("");

  return {
    bookings: {
      data,
    },
  };
};

export default useBookings;
