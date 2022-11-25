const TOKEN_KEY = process.env.TOKEN_KEY;

module.exports = {
    TOKEN_KEY,
    jwtOption: {
        audience: "reactjs",
        issuer: "expressjs",
        expiresIn: 60, 
    }
}