import { FC } from "react";
import { trpc, queryClient, trpcClient } from "./services/trpc/index.ts";
import { QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./router.tsx";
import "@bookd/bookd-ui/styles/base.css";

export const App: FC = () => {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default App;
