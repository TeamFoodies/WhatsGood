// Starter code: https://adamtheautomator.com/https-nodejs/

// Dependencies
const https = require("https");
const express = require("express");

const app = express();
const PORT = 4000;
https
  .createServer(app)
  .listen(PORT, ()=>{
    console.log('Server running on port ' + PORT)
  });

// Create an try point route for the Express app listening on port 4000.
// This code tells the service to listed to any request coming to the / route.
// Once the request is received, it will display a message "Hello from express server."
app.get('/', (req, res)=>{
  res.send("Hello world!")
})