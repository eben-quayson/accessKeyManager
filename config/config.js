require('dotenv').config();

const config = {
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 5432,  // Default PostgreSQL port
    ssl: process.env.DB_SSL === 'true', // Convert string to boolean
  },
  server: {
    port: process.env.PORT || 5000
  }
};

module.exports = config;
