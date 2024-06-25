const {Pool}  = require('pg');
const  config  = require('./config');
const configDotenv  = require('dotenv');
require('dotenv').config();

const pool = new Pool({
    connectionString: configDotenv.Database_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool