// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express=require('express');
// Start up an instance of app
const app=express();
/* Middleware*/
const cors =require('cors');
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

//post route
app.post('/addData', (req, res)=> {
  projectData['temperature'] = req.body.temperature;
  projectData['date'] = req.body.date;
  projectData['response'] = req.body.response;
  res.send(projectData);
});

//get route
app.get('/all', (req, res)=> {
  res.send(projectData);
  console.log(projectData);//to check
});
// Setup Server
const port = 3000;
const server = app.listen(port, ()=>{console.log(`running on http://localhost:${port}`)});

