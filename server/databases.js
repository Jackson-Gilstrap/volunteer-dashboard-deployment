const { Pool } = require("pg");
require("dotenv").config();
const postgres_url = process.env.POSTGRES_URL;
// POSTGRES_URL =
//   "postgres://default:JnUYdHa7IGt4@ep-snowy-bush-a4fvj1pp-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require";
console.log("Connecting to PostgreSQL database with URL:", postgres_url);
const pool = new Pool();

// pool
//   .connect()
//   .then(() => {
//     console.log("connected to the database");
//   })
//   .catch((error) => {
//     console.error("Error connecting to the postgres database", error);
//   });

module.exports = pool;
