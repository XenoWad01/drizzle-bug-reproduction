import type { Config } from "drizzle-kit";
import { config } from "../config";



export default {
  schema: "./db/schema/*",
  out: "./migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: config.dbConnectionString,
  },
} satisfies Config;
