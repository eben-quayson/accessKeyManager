const bcrypt = require('bcrypt')

const saltRounds = 10;

const hash_password = (plainPassword) => {
    bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
        if (err) {
            console.error('Error while hashing password:', err);
            return;
        }
        return hash
    })
}

module.exports =  {
    hash_password,
}
