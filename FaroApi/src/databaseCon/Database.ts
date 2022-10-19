import mysql from "mysql2";
import * as dotenv from "dotenv";
dotenv.config();

export const dbAdmin = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
});

export const dbPublic = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_PUBLIC_USER,
  password: "",
  database: process.env.DB_NAME,
});
