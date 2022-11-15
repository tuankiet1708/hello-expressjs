const express = require('express');
const greet = express.Router()

greet.get('/jp', function (req, res) { // /greet/jp
    console.log(req.baseUrl) // /greet
    res.send('Konichiwa!')
})

greet.get('/vi', function (req, res) { // /greet/vi
    console.log(req.baseUrl) // /greet
    res.send('Xin chao!')
})

module.exports = greet;