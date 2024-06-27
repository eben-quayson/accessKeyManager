const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const path = require('path');
const {pool} = require('./config/config');
const authRoutes = require('./routes/authRoutes');
const keyRoutes = require('./routes/keyRoutes');
const passwordRoutes = require('./routes/passwordRoutes');

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    store: new pgSession({
        pool: pool
    }),
    secret: process.env.SESSION_SECRET || "defaultSecret",
    resave: false,
    saveUninitialized: false
}));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));


app.use('/auth', authRoutes);
app.use('/keys', keyRoutes);
app.use('/password', passwordRoutes);

app.get('/', (req, res) => {
    res.render('signin');
});


const createSchema = async () => {
    const userTable = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            is_admin BOOLEAN DEFAULT FALSE
        );
    `;

    const accessKeyTable = `
        CREATE TABLE IF NOT EXISTS access_keys (
            id SERIAL PRIMARY KEY,
            key VARCHAR(255) UNIQUE NOT NULL,
            school_id VARCHAR(255) NOT NULL,
            is_active BOOLEAN DEFAULT FALSE
        );
    `;

    const passwordResetTable = `
        CREATE TABLE IF NOT EXISTS password_resets (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            token VARCHAR(255) UNIQUE NOT NULL,
            expiration BIGINT NOT NULL
        );
    `;
        

    await pool.query(userTable);
    await pool.query(accessKeyTable);
    await pool.query(passwordResetTable);
};

createSchema()
    .then(() => {
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error creating schema:', err);
    });
