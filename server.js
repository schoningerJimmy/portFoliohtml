const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const nodeMailer = require('nodemailer');

const path = require('path');

const app = express();

// function to verify email using regular expression
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended :false}));


app.use(cors());




// Serve the static files from the public repo
app.use(express.static(path.join(__dirname, 'public')));

// An api endpoint that returns a short list of items
app.get('/api', (req, res, next) => {
    res.send('API status: running');
});


// the endpoint for the post request
app.post('/api/email', (req, res) => {
    
    console.log(req.body.name); // Subject line
    console.log(req.body.informationDetails); // plain text body
    console.log(req.body.email);

    if (req.body.name === '' || req.body.email === '' ||  req.body.informationDetails === '') {
        res.status(401).json({
            success: false
        });
    }

    if(!validateEmail(req.body.email)) {
        res.status(401).json({
            success: false
        });
    }




    const transporter = nodeMailer.createTransport({
        host: "smtp-mail.outlook.com", // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        tls: {
            ciphers:'SSLv3'
        },
        auth: {
            user:  process.env.EMAIL_ID,
            pass: process.env.EMAIL_PW
        }
    });

    // send mail with defined transport object
    transporter.sendMail({
        from: process.env.EMAIL_ID, // sender address
        to: process.env.EMAIL_ID, // list of receivers
        subject: "contact from " + req.body.name, // Subject line
        text: req.body.informationDetails, // plain text body
        replyTo: req.body.email
    }, (err, info) => {
        if (err) {
            console.log(err);
            res.status(401).json({
                success: false
            });
        }
        console.log('Message sent: ' + info.messageId);
        res.status(200).json({
            success: true
        });
    });
    // check the email format to avoid spam email
    // il email.format is false, return a error status code and dont send email.
})
// download the resume from the button

app.get('/download', function(req, res){
    console.log("called");
    const file = path.join(__dirname, 'public', 'data', 'test.txt');
    res.download(file); // Set disposition and send it.
  });


// Handles any requests that don't match the ones above

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname , 'public', 'index.html'));
});



const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);