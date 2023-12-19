import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "./drizzle";

async function main() {
  console.log("(🐤) Migrating        .");
  await migrate(db, { migrationsFolder: "migrations" });
  console.log("(🐥) Migration done   ..");
  console.log("(🔥) Bird exploded    ...");
  process.exit(0);
}

main().catch((err) => {
  console.log("Migration ERROR!!! \n", err);
  process.exit(0);
});
