import { useCallback } from "react";
import { trpc } from "../trpc";

export const useRooms = () => {
  const { isLoading, mutateAsync: mutateRooms } =
    trpc.rooms.helloRooms.useMutation();

  const updateRoom = useCallback(
    async (params: Parameters<typeof mutateRooms>[0]) => {
      const responseData = await mutateRooms(params);
      return responseData.result;
    },
    [mutateRooms],
  );

  return {
    updateRoom: {
      loading: isLoading,
      updateRoom,
    },
  };
};

export default useRooms;
