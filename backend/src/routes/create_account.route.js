const express = require('express');
const Joi = require('joi');
const router = express.Router();

const headers = require('../scripts/headers.script');
const login_controller = require('../controllers/login.controller');

const schema = Joi.object().keys({
  username: Joi.string()
    .min(3)
    .max(20)
    .regex(RegExp('^[a-zA-Z0-9_]+'))
    .required(),
  password: Joi.string()
    .required()
});

// Invalid schema response
const validation_error_response = { response: 400, error: 'Invalid login request.' };

router.post('/', (request, response) => {
  console.log('POST /create_account');
  console.dir(request.body);

  const { error, value } = schema.validate(request.body);
  if (error) {
    response.writeHead(400, headers.JSON)
    response.end(JSON.stringify(validation_error_response));
    return;
  }

  login_controller.isUsernameTaken(value.username).then();

  response.writeHead(200, headers.JSON);
  response.end(JSON.stringify({message: 'To be implemented!'}));
});

module.exports = router;