import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { schema } from ".";
import { config } from "../config";



const client = new Client({
  connectionString: config.dbConnectionString,
});

client.connect();
export const db = drizzle<typeof schema>(client, { schema: schema, logger: true });
