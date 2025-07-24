const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'qwerty2',
  password: 'qwerty2024',
  port: 5432,
});

module.exports = pool;