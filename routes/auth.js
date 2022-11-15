const express = require('express');
const auth = express.Router();
const bcrypt = require('bcrypt');

auth.get('/', function (req, res) {
    if (req.session.username) {
        return res.redirect('/hello');
    }

    res.send(`
        <form action="/auth/login" method="post">
            <input type="text" name="username"/>
            <input type="password" name="password"/>
            <button type="submit">Login</button>
        </form>
    `)
})

auth.get('/register', function (req, res) {
    const {username, password, age, address} = req.body;

    // INSERT INTO user VALUES ()

    res.send("ok");
})

auth.post('/login', async function (req, res) {
    const {username, password} = req.body;

    // giả sử gọi database để kiểm tra thông tin đăng nhập
    // SELECT * FROM `user` WHERE username = <username> AND password = hash(<password>)
    const match = await bcrypt.compare('123456', bcrypt.hashSync(password, 12));

    if (username == "admin" && match) {
        req.session.username = "admin";
        req.session.name = "Kiet Tran";

        // res.send(`
        //     <div style="text-align:center;color:green;font-size:24px;">
        //         Hi admin! You have signed in.
        //     </div>
        // `);
        res.redirect('/hello');
    }
    else {
        res.send(`
            <div style="text-align:center;color:red;font-size:24px;">
                Something wrong with your account! Please try again.
            </div>
        `);
    }
});

auth.get('/logout', function (req, res) {
    req.session.destroy(function(err) {
        if (err) {
            res.send('Can not log out');
        }
        else {
            res.redirect('/auth')
        }
    })
})



module.exports = auth;