// require('dotenv').config(); 

var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');


var app = express();

var route = require('./backend/route');

//connect to mongodb
// mongoose.connect('mongodb://127.0.0.1:27017/clientslist');
mongoose.connect('mongodb+srv://developer_habeeb:4AGuuAKvJBvPZ@cluster0.hlc4c.mongodb.net/profiling-system?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to database');
    })
    .catch((err) => {
        console.log('Connection failed : ' + err);
    });

//on connection 
mongoose.connection.on('connected', () => {
    console.log('Connected to database mongodb @ 27017');
});

mongoose.connection.on('connected', (err) => {
    if (err) {
        console.log("Error in database con: " + err);
    }
});


///port no
const port = process.env.PORT || 3000;

///adding middleware - cors
app.use(cors());

//adding body-parser
app.use(bodyparser.json());

//static files
app.use(express.static(path.join(__dirname, "src/app")));
app.use('/images', express.static(path.join("images")));
app.use('/api', route);


///testing server
app.get('/', (req, res) => {
    res.send('foobar');
});

app.listen(port, () => {
    console.log('Server started at port: ' + port);
})