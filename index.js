const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');

const app = express();
const session = require('express-session');

// https://www.npmjs.com/package/express-session
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 600000 }}))

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

//start app 
const port = process.env.PORT || 3000;

app.post('/upload', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let avatar = req.files.avatar;
            
            //Use the mv() method to place the file in the upload directory (i.e. "uploads")
            avatar.mv('./uploads/' + avatar.name);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: avatar.name,
                    mimetype: avatar.mimetype,
                    size: avatar.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.use('/jwt', require('./routes/jwt')) // load the router on '/jwt'
app.use('/auth', require('./routes/auth')) // load the router on '/auth'
app.use('/greet', require('./routes/greet')) // load the router on '/greet'
app.use('/hello', require('./routes/hello')) // load the router on '/hello'
app.use('/mysql', require('./routes/mysql')) // load the router on '/mysql'
app.use('/search', require('./routes/search')) // load the router on '/search'
// app.use(['/gre+t', '/hel{2}o'], greet)

// app.use('/', function(req, res) {
//     res.redirect('/hello');
// })

app.listen(port, () => 
  console.log(`App is listening on port ${port}.`)
);