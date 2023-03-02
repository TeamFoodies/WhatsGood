const express = require('express');
const router = express.Router();
const Joi = require('joi');

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

// Error responses
const validation_error_response = { response: 400, error: 'Invalid login request.' };
const unauthorized_response = { response: 401, error: 'Invalid username or password.' };
const internal_error_response = { response: 500, error: 'Internal error occurred.' };

router.post('/', function(request, response) {
  console.log('POST /login');
  console.dir(request.body);

  const { error, value } = schema.validate(request.body);
  if (error) {
    response.writeHead(400, headers.JSON);
    response.end(JSON.stringify(validation_error_response));
    return;
  }

  login_controller.login(value.username, value.password)
    .then(key => {
      if (!key) {
        response.writeHead(401, headers.JSON);
        response.end(JSON.stringify(unauthorized_response));
        return;
      }

      response.writeHead(200, headers.JSON);
      const valid_response = { response: 200, key: key };
      response.end(JSON.stringify(valid_response));
    })
    .catch(() => {
      response.writeHead(500, headers.JSON);
      response.end(JSON.stringify(internal_error_response));
    });
});

module.exports = router;