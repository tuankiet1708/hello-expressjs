const db = require("../database/mysql");

const UsersJwt = {
    getUserByEmail: (email, callback) => {
        return db.query('SELECT * FROM users_jwt WHERE email = ? AND deleted_at IS NULL', [email], callback);
    },
    createNewUser: (email, encryptedPassword, callback) => {
        return db.query('INSERT INTO users_jwt (email, password) VALUES (?,?)', [email, encryptedPassword], callback);
    }
};

module.exports = UsersJwt;