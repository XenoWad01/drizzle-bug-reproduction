import express from "express";
import { appRouter, createContext } from "./trpc";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import { logFire } from "./utils/console-log-fire";
import { config } from "./config";
import { errorHandler } from "./middlewares/log-errors";


// Init express app
const app = express();

app.use(cors({credentials: true}));

// Add trpc as middleware to all of our requests going to the /trpc base route
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
    
  }),
);




app.use(errorHandler)
// Listen on port for incoming requests
app.listen(config.port);

logFire(config.protocol, config.domain, config.port);

// config.env === 'local' && console.log('Config: ', config) 