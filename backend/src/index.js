// Starter code: https://adamtheautomator.com/https-nodejs/

// Dependencies
const https = require("https");
const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 4000;
https
  .createServer(
    {
      key: fs.readFileSync("ssl/key.pem"),
      cert: fs.readFileSync("ssl/cert.pem"),
    },
    app
  )
  .listen(PORT, () => {
    console.log('Server running on port ' + PORT)
  });

app.get('/', (req, res)=>{
  res.send("API homepage of What's Good.")
})