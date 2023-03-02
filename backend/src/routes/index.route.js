const express = require('express');
const router = express.Router();

router.get("/", (request, response) => {
  console.log("GET /");
  response.writeHeader(200, {"Content-Type": "text/plain"});
  response.send("Welcome to What's Good API");
});

module.exports = router;