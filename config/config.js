const config = {
    server: {
        port: process.env.PORT || 3000
    },
    session: {
        secret: process.env.SESSION_SECRET || 'supersecret'
    },
    db: {
        connectionString: process.env.DATABASE_URL
    },
    email: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
};

module.exports = config