const { Pool } = require('pg');
const config = require('./config.js');

const pool = new Pool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  port: config.db.port,  // You can add a port if needed
  ssl: config.db.ssl,    // This can be useful for production environments
});

pool.on('connect', () => {
  console.log('Connected to the PostgreSQL database...');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});
module.exports = pool;
