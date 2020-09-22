 // Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
//Here we are configuring express to use cors
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = process.env.PORT || 8000;

const server = app.listen(port, listening);

function listening() {
 console.log('server running');
 console.log(`running on localhost: ${port}`);
}

// Initialize all route with a callback function
app.get('/all', getData);

// Callback function to complete GET '/all'
function getData(req, res) {
  res.send(projectData);

}

// Post Route
// Initialize add route with a callback function
app.post('/add', addData);

// Callback function to complete POST '/add'
function addData(req, res) {
  projectData['temp']    = req.body.temp;
  projectData['date']    = req.body.date;
  projectData['content'] = req.body.content;
  res.send(projectData);
}
