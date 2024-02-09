const { Pool } = require("pg");

POSTGRES_URL =
  "postgres://default:JnUYdHa7IGt4@ep-snowy-bush-a4fvj1pp-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require";
console.log("Connecting to PostgreSQL database with URL:", POSTGRES_URL);
const pool = new Pool({
  connectionString: POSTGRES_URL,
});

pool
  .connect()
  .then(() => {
    console.log("connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the postgres database", error);
  });

module.exports = pool;
