require('dotenv').config();
const { Pool } = require('pg');

const db = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: process.env.POSTGRES_PORT,
});

db.connect()
  .then(() => console.log('The database is connected successfully ✅'))
  .catch((err) => console.error('Error connecting to the database ❌', err));

module.exports = db;
