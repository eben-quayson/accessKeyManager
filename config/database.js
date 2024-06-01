//Getting dependencies
const { hoursToSeconds } = require('date-fns');
const mysql = require('mysql2/promise');
require('dotenv').config();

//Creating database that can handle simultaneous requests
pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATA_PASSWORD,
    database:process.env.DATABASE_NAME,
    waitForConnections:true,
    connectionLimit: 50,
    queueLimit: 0

});


//export the 'pool' module
module.exports = pool;