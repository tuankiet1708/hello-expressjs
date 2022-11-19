const express = require('express');
const jwt = express.Router();
const connection = require("../database/mysql");


jwt.get('/', function (req, res) {
   res.send("Hello JWT");
})

jwt.post('/register', function (req, res) {
    const {email, password} = req.body;


    /**
     * email đúng cấu trúc 
     * password mạnh
     * email không trùng với email đã tồn tại
     */ 
    if (email == '' || password == '') {
        return res.status(400).send({
            "error": "empty email or password"
        })
    }

    /**
     * table users 
     *  - user_id
     *  - email
     *  - password
     */

    /** 
     * INSERT INTO users (email, password) VALUES (<email>, <password>)
     */

    connection.query(
        `INSERT INTO users_jwt (email, password) VALUES ( '${email}' , '${password}' )`,
        (error) => {
            res.status(error ? 400 : 200).send({
                "error": error
            })
        }
    )


    
});

module.exports = jwt;