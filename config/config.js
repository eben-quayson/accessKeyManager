const { Pool } = require('pg');
const {connectionString} = require('pg/lib/defaults');
require('dotenv').config();

const config = {
    server: {
        port: process.env.PORT || 3000
    },
    session: {
        secret: process.env.SESSION_SECRET || 'superdupesrecretkey'
    },
    db: {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT || 5432,
        ssl: process.env.ssl === false,
        connectionString: process.env.DATABASE_URL
    },
    email: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
};

const pool = new Pool({
    connectionString: config.db.connectionString,
    user: config.db.user,
    host: config.db.host,
    database: config.db.database,
    password: config.db.password,
    port: config.db.port,
    ssl: config.db.ssl ? {rejectUnauthorized: false } : false,
});

// Testing the database connection 1,2..
pool.connect()
    .then(client => {
        console.log('Connected to PostgreSQL database');
        client.release();
    })
    .catch(err => console.error('Error connecting to PostgreSQL database:', err.stack));

module.exports = { config, pool };
