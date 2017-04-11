var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var path = require('path');

var user = require('./controllers/user');
var weather = require('./controllers/weather');

//Port number
var port = 3000;

//Set template engine
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//Set static content path
app.use(express.static(path.join(__dirname, 'public')))

//CORS middleware
app.use(cors());

//BodyParser middleware
app.use(bodyParser.json());

//Set paths
app.use('/', user);
app.use('/weather', weather);

//Start server
app.listen(port, function () {
    console.log("Server started on port " + port);
    console.log("http://localhost:" + port);
});



