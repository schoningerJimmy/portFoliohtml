const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');



const path = require('path');

const app = express();


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
    
    res.status(200).json({
        success: true
    });
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