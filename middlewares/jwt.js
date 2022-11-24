
const jsonWebToken = require('jsonwebtoken');
const config = require('../config/jwt');

const signToken = (userId, email) => {
    return jsonWebToken.sign(
        // payload
        { 
            userId,
            email
        }, 
        // secret key
        config.TOKEN_KEY,  // 
        // timeout
        config.jwtOption
    );
}

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
  
    if (!token) {
        return res.status(403).send({
            error: "EMPTY_TOKEN"
        });
    }

    try {
        const decoded = jsonWebToken.verify(token, config.TOKEN_KEY);

        // save user info in request variable
        req.user = decoded;
    } 
    catch (err) {
        const {name} = err;

        if (name === "TokenExpiredError") {
            const decoded = jsonWebToken.decode(token);

            return res.status(200).send({
                newToken: signToken(decoded.userId, decoded.email)
            });
        } else {
            return res.status(401).send({
                error: err
            });
        }
    }

    return next();
};

module.exports = {
    verifyToken, 
    signToken
}