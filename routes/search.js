const express = require('express');
const axios = require('axios');
const search = express.Router()

const googleApi = require('../config/googleApi');
const {url, cx, key} = googleApi.googleSearch;
const {verifyToken, signToken} = require('../middlewares/jwt');

search.get('/google', verifyToken, async (req, res) => { // /search/top quán cafe ngon ở sài gòn site:toplist.vn
    // const response = axios.get(googleSearchApi);

    // axios.get(googleSearchApi)
    //     .then(response => {
    //         console.log(response);
    //         res.send(response.data);
    //     })
    
    const start = (parseInt(req.query.page) - 1) * 10 + 1;
    const googleSearchApi = `${url}?q=${req.query.keyword}&cx=${cx}&key=${key}&start=${start}`;

    const response = await axios.get(googleSearchApi);
    res.send(response.data);
}) 

search.get('/bing', (req, res) => {
    res.send("Search with Bing is under construction!");
})

module.exports = search;