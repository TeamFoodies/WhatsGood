const express = require('express');
const router = express.Router();

const create_header = require('../scripts/create_header.script');

router.get('/', (request, response) => {
  console.log('GET /');
  response.writeHeader(200, create_header('text/plain'));
  response.send("Welcome to What's Good API");
});

module.exports = router;