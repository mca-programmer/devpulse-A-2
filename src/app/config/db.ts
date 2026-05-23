import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool
  .connect()
  .then((client: any) => {
    console.log(" PostgreSQL connected successfully");
    client.release();
  })
  .catch((error: any) => {
    console.error(" Database connection failed:", error.message);
  });