const { Pool } = require('pg');
require('dotenv').config();

const config = {
    server: {
        port: process.env.PORT || 3000
    },
    session: {
        secret: process.env.SESSION_SECRET || 'supersecretkey'
    },
    db: {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT || 5432
    },
    email: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
};

const pool = new Pool({
    user: config.db.user,
    host: config.db.host,
    database: config.db.database,
    password: config.db.password,
    port: config.db.port
});

module.exports = { config, pool };
