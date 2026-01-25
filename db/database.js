import { Pool } from "pg";
import { config } from "../config.js";

export const pool = new Pool({
  host: config.db.host,
  user: config.db.user,
  database: config.db.name,
  password: config.db.password,
  port: config.db.port,
});

export async function query(text, params = []) {
  const res = await pool.query(text, params);
  return res;
}
