import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pool from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const initDb = async () => {
  try {
    const schemaPath = path.resolve(__dirname, "../../database/01_schema.sql");
    const seedPath = path.resolve(__dirname, "../../database/02_seed.sql");

    const schema = fs.readFileSync(schemaPath, "utf8");
    await pool.query(schema);
    console.log("Database schema applied");

    if (fs.existsSync(seedPath)) {
      const seed = fs.readFileSync(seedPath, "utf8");
      await pool.query(seed);
      console.log("Seed data applied");
    }
  } catch (err) {
    console.error("Database initialization error:", err.message);
  }
};
