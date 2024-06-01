const pool = require('config/database');

const createStudentTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS students(
        id INT AUTO INCREMENT NOT NULL
        email VARCHAR(32) UNIQUE NOT NULL
        key-active BOOLEAN DEFAULT FALSE
        key-revoked BOOLEAN DEFAULT FALSE);`
        ;
    await pool.query(query);
    
};

