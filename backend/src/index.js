// Environment
require('dotenv').config();

// Initialize mongo connection - close application if no connection string specified
if (!require('./controllers/database.controller').mongo()) return;

// Starter code: https://adamtheautomator.com/https-nodejs/

// Dependencies
const https = require('https');
const express = require('express');
const fs = require('fs');

// Routes
const index_route = require('./routes/index.route');
const login_route = require('./routes/login.route');

const app = express();
app.use(express.json());
const PORT = 4000;
https
  .createServer(
    {
      key: fs.readFileSync('ssl/key.pem'),
      cert: fs.readFileSync('ssl/cert.pem'),
    },
    app
  )
  .listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  });

// Routes
app.use('/', index_route);
app.use('/login', login_route);