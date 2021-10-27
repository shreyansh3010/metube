const pool = require("pg").Pool;

// Prostgres DB Connection
const db = new pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PWD,
  port: 5432
});

module.exports = {
    db: db
}