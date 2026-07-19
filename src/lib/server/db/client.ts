import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error("Missing DATABASE_URL environment variable");
}

const sql = neon(dbUrl);

export const db = drizzle({ client: sql, schema });
