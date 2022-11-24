const express = require('express');
const jwt = express.Router();
const connection = require("../database/mysql");
const bcrypt = require('bcrypt');
const _ = require('lodash');
const jsonWebToken = require('jsonwebtoken');
const {verifyToken, signToken} = require('../middlewares/jwt');
const jwtConfig = require('../config/jwt');

jwt.get('/', (req, res) => {
   res.send("Hello JWT");
})

jwt.post('/verify', verifyToken, (req, res) => {
    // xử lý 
    res.send({
        "data": req.user
    })
})

jwt.post('/login', (req, res) => {
    const {email, password} = req.body;

    /**
     * email đúng cấu trúc 
     * password mạnh
     * email không trùng với email đã tồn tại
     */ 
    if (email == '' || password == '') {
        return res.status(400).send({
            "error": "EMPTY_EMAIL_OR_PWD"
        })  
    }

    connection.query(
        `SELECT * FROM users_jwt where email = '${email}'`,
        async (error, result) => {
            const {
                password: encryptedPassword = '', 
                user_id: userId
            } = _.get(result, '0', {});

            const isSamePassword = await bcrypt.compare(password, encryptedPassword);

            if (isSamePassword) {
                res.status(200).send({
                    "error": null,
                    "data": {
                        token: signToken(userId, email)
                    }
                })
            }
            else {
                res.status(400).send({
                    "error": "INVALID_ACCOUNT"
                })
            }
        }
    )
})

jwt.post('/register', async (req, res) => {
    const {email, password} = req.body;


    /**
     * email đúng cấu trúc 
     * password mạnh
     * email không trùng với email đã tồn tại
     */ 
    if (email == '' || password == '') {
        return res.status(400).send({
            "error": "EMPTY_EMAIL_OR_PWD"
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

    const encryptedPassword = await bcrypt.hash(password, 10);

    connection.query(
        `INSERT INTO users_jwt (email, password) VALUES ( '${email}' , '${encryptedPassword}' )`,
        (error) => {
            res.status(error ? 400 : 200).send({
                "error": error ? error.code : null
            })
        }
    )
});

module.exports = jwt;