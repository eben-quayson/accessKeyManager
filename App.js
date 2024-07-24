const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const pgSession = require('connect-pg-simple')(session);
const path = require('path');
const {pool} = require('./config/config');
const authRoutes = require('./routes/authRoutes');
const keyRoutes = require('./routes/keyRoutes');
const passwordRoutes = require('./routes/passwordRoutes');
const MemoryStore = require('memorystore')(session)

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(session({
    store: new MemoryStore({
        checkPeriod: 86400000  // prune expired entries every 24h
      }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRoutes);
app.use('/keys', keyRoutes);
app.use('/password', passwordRoutes);

app.get('/dashboard', async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/auth/signin');
    }

app.get('/', (req, res) => {
        res.redirect('/auth/signin');
    });
    

    try {
        const client = await pool.connect();
        const userQuery = 'SELECT * FROM users WHERE email = $1';
        const userResult = await client.query(userQuery, [req.session.userId]);
        const user = userResult.rows[0];

        let userKeys = await AccessKey.getKeysByUser(user.email);
        let allKeys = user.isadmin ? await AccessKey.getAllKeys() : [];

        client.release();

        res.render('dashboard', { 
            email: user.email, 
            userKeys, 
            allKeys,
            isAdmin: user.isadmin 
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


const createSchema = async () => {
    const userTable = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            is_admin BOOLEAN DEFAULT FALSE,
            is_verified BOOLEAN DEFAULT FALSE,
            verification_token VARCHAR(255)
        );
    `;

    const accessKeyTable = `
        CREATE TABLE IF NOT EXISTS access_keys (
            id SERIAL PRIMARY KEY,
            key VARCHAR(255) UNIQUE NOT NULL,
            user_id INTEGER REFERENCES users(id),
            is_active BOOLEAN DEFAULT TRUE,
            creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            expiration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP + INTERVAL '1 year'
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


// createSchema()
//     .then(() => {
//         const PORT = process.env.PORT || 4000;
//         app.listen(PORT, () => {
//             console.log(`Server is running on port ${PORT}`);
//         });
//     })
//     .catch(err => {
//         console.error('Error creating schema:', err);
//     });
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });