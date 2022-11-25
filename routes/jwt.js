const express = require('express');
const jwt = express.Router();
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {verifyToken, signToken} = require('../middlewares/jwt');
const UsersJwt = require('../models/UsersJwt');
const Mailer = require('../models/Mailer');

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

    UsersJwt.getUserByEmail(email, async (error, result) => {
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
    })
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

    const encryptedPassword = await bcrypt.hash(password, 10);

    UsersJwt.createNewUser(email, encryptedPassword, (error) => {
        if (! error) {
            // gui mail
            Mailer.sendEmailAfterCreatingNewUser(email);
        }

        res.status(error ? 400 : 200).send({
            "error": error ? error.code : null
        })
    })
});

module.exports = jwt;