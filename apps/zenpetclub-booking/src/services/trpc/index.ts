import {
  TRPCClientError,
  createTRPCReact,
  httpBatchLink,
} from "@trpc/react-query";
import { AppRouter } from "@bookd/bookd-api/trpc";
import { QueryCache, QueryClient } from "@tanstack/react-query";
// import { config as backendConfig } from "@bookd/bookd-api/config";
// const baseAPI = `${backendConfig.url}/trpc`;

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: 'http://localhost:4000/trpc',
    }),
  ],
});

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (e) => {
      const error = e as TRPCClientError<AppRouter>;
      const typescriptPLEASE = new TRPCClientError("typescript PLEASE >...>");
      console.log(typescriptPLEASE, error);
      // TODOIf request fails with unauthorized and we have refresh token => refresh the accessToken with refreshToken
      // TODO Else if request fails and we don't have refresh token => set isLoggedIn: false
    },
  }),
});
