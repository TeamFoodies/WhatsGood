const express = require('express');
const Joi = require('joi');
const router = express.Router();

const headers = require('../scripts/headers.script');
const login_controller = require('../controllers/login.controller');

const schema = Joi.object().keys({
  auth_key: Joi.string().required()
});

const validation_error_response = { response: 400, error: 'Invalid request.' };
const unauthorized_response = { response: 401, error: 'This key is invalid or expired. Are you logged in?' }
const internal_error_response = { response: 500, error: 'Internal error occurred.' };

router.post('/', (request, response) => {
  console.log('POST /logout');
  console.dir(request.body);

  const { error, value } = schema.validate(request.body);
  if (error) {
    response.writeHead(400, headers.JSON);
    response.end(JSON.stringify(validation_error_response));
    return;
  }

  const logout_response = login_controller.logout(value.auth_key);
  if (!logout_response) {
    response.writeHead(401, headers.JSON);
    response.end(JSON.stringify(unauthorized_response));
    return;
  }

  const valid_response = { response: 200, message: 'Successfully logged out.' }
  response.writeHead(200, headers.JSON);
  response.end(JSON.stringify(valid_response));
});

module.exports = router;