const express = require('express');
const hello = express.Router()

hello.get('/', function (req, res) { // /hello
    if (! req.session.username) {
        return res.redirect('/auth');
    }
    res.send("Hello " + req.session.name)
})

module.exports = hello;