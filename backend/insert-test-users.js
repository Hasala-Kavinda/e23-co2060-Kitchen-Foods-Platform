import pkg from "pg";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

dotenv.config({ path: "./.env" });

const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME || "yourdb",
  user: process.env.DB_USER || "youruser",
  password: process.env.DB_PASSWORD || "yourpassword",
});

const testUsers = [
  {
    full_name: "Admin User",
    email: "admin@test.com",
    password: "12345678",
    role: "Admin",
  },
  // You can add more test users for different roles
  // {
  //   full_name: "Test Chef",
  //   email: "chef@test.com",
  //   password: "12345678",
  //   role: "Chef",
  // },
  // {
  //   full_name: "Test Customer",
  //   email: "customer@test.com",
  //   password: "12345678",
  //   role: "Customer",
  // },
];

async function insertTestUsers() {
  const client = await pool.connect();

  try {
    const inserted = [];

    for (const user of testUsers) {
      const passwordHash = await bcrypt.hash(user.password, 10);
      const uid = uuidv4();

      // Determine which table to insert into based on role
      let tableName;
      let roleValue;

      switch (user.role) {
        case "Admin":
          tableName = "admin";
          roleValue = "Admin";
          break;
        case "Chef":
          tableName = "chefs";
          roleValue = "Chef";
          break;
        case "Customer":
          tableName = "users";
          roleValue = "Customer";
          break;
        default:
          console.error(`Unknown role: ${user.role}`);
          continue;
      }

      const result = await client.query(
        `INSERT INTO ${tableName} (uid, full_name, email, password_hash, role)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (email) DO NOTHING
         RETURNING uid, full_name, email, role`,
        [uid, user.full_name, user.email, passwordHash, roleValue],
      );

      if (result.rows.length > 0) {
        inserted.push({
          ...result.rows[0],
          table: tableName,
        });
      }
    }

    if (inserted.length === 0) {
      console.log("No new users inserted (all emails already exist).");
    } else {
      console.log("Inserted users:");
      console.table(inserted);
    }
  } catch (error) {
    console.error("Error inserting test users:", error.message);
  } finally {
    client.release();
    await pool.end();
  }
}

insertTestUsers();
