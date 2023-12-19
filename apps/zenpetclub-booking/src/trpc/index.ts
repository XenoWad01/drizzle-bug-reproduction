import {
  TRPCClientError,
  createTRPCReact,
  httpBatchLink,
} from "@trpc/react-query";

import { QueryCache, QueryClient } from "@tanstack/react-query";
import { AppRouter } from "@bookd/bookd-api/trpc";

export const trpc = createTRPCReact<AppRouter>();

const baseUrl = 'http://localhost'
export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: `${baseUrl}/trpc`,
      // TODO not sure if this is needed as we use passport on the backend with cookies
      async headers() {
        return {
          authorization: "whatevs",
        };
      },
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
