import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();
export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  driver: 'mysql2',
  dbCredentials: {
    user: "root",
    password: 'Abin@12345',
    host: "localhost",
    port: 3306,
    database: "porukaracollege",
  }
} satisfies Config;