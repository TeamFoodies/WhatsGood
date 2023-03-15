const express = require('express');
const Joi = require('joi');
const router = express.Router();

const headers = require("../scripts/headers.script");
const user_controller = require('../controllers/user.controller');

const schema = Joi.object().keys({
  restaurant_id: Joi.string().required(),
  auth_key: Joi.string().required()
})

// Errors
const validation_error_response = { response: 400, error: 'Invalid request.' };
const unauthorized_response = { response: 401, error: 'This key is invalid or expired. Are you logged in?' }
const internal_error_response = { response: 500, error: 'Internal error occurred.' };

router.post('/add', (request, response) => {
  console.log('/POST /favorite/add');
  console.dir(request.body);

  const { error, value } = schema.validate(request.body);
  if (error) {
    response.writeHead(400, headers.JSON);
    response.end(JSON.stringify(validation_error_response));
    return;
  }

  user_controller.addFavorite(value.auth_key, value.restaurant_id)
    .then(result => {
      if (!result) {
        response.writeHead(401, headers.JSON);
        response.end(JSON.stringify(unauthorized_response));
        return;
      }

      const success_response = { response: 200, message: 'Favorite added.' };
      response.writeHead(200, headers.JSON);
      response.end(JSON.stringify(success_response))
    })
    .catch(error => {
      console.log(error);
      response.writeHead(500, headers.JSON);
      response.end(JSON.stringify(internal_error_response));
    })
})

router.post('/remove', (request, response) => {
  console.log('/POST /favorite/remove');
  console.dir(request.body);

  const { error, value } = schema.validate(request.body);
  if (error) {
    response.writeHead(400, headers.JSON);
    response.end(JSON.stringify(validation_error_response));
    return;
  }

  user_controller.removeFavorite(value.auth_key, value.restaurant_id)
    .then(result => {
      if (!result) {
        response.writeHead(401, headers.JSON);
        response.end(JSON.stringify(unauthorized_response));
        return;
      }

      const success_response = { response: 200, message: 'Favorite removed.' };
      response.writeHead(200, headers.JSON);
      response.end(JSON.stringify(success_response))
    })
    .catch(error => {
      console.log(error);
      response.writeHead(500, headers.JSON);
      response.end(JSON.stringify(internal_error_response));
    })
})

exports.router = router;
exports.schema = schema;