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
const username_taken_response = { response: 400, error: 'Username is already taken.' };
const success_response = { response: 200, message: 'Login success.' };
const internal_error_response = { response: 500, error: 'Internal error occurred.' };

router.post('/', (request, response) => {
  console.log('POST /create_account');
  console.dir(request.body);

  const { error, value } = schema.validate(request.body);
  if (error) {
    response.writeHead(400, headers.JSON)
    response.end(JSON.stringify(validation_error_response));
    return;
  }

  login_controller.createAccount(value.username, value.password)
    .then((result) => {
      if (!result) {
        response.writeHead(400, headers.JSON);
        response.end(JSON.stringify(username_taken_response));
        return;
      }

      response.writeHead(200, headers.JSON);
      response.end(JSON.stringify(success_response));
    })
    .catch(() => {
      response.writeHead(500, headers.JSON);
      response.end(JSON.stringify(internal_error_response));
    });
});

module.exports = router;