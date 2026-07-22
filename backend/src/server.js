import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { pool } from "./db/client.js";

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await pool.query("SELECT NOW()");
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Startup error:", error.message);
    process.exit(1);
  }
}

start();