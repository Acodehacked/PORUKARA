import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();
export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: 'mysql',
  breakpoints: true,
  dbCredentials: ({
      user: "root",
      password: 'Abin@12345',
      host: "localhost",
      port: 3306,
      database: "porukaracollege",
  })
});