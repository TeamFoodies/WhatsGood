const express = require('express');
const Joi = require('joi');
const router = express.Router();

const headers = require("../scripts/headers.script");
const restaurant_controller = require('../controllers/restaurant.controller');

const validation_error_response = { response: 400, error: 'Invalid request.' };
const unauthorized_response = { response: 401, error: 'This key is invalid or expired. Are you logged in?' }
const internal_error_response = { response: 500, error: 'Internal error occurred.' };
const restaurant_not_found_response = { response: 404, error: 'Restaurant not found.' };

const add_schema = Joi.object().keys({
  restaurant_id: Joi.string().required(),
  rating: Joi.number().min(0).max(5).required(),
  title: Joi.string().trim().required(),
  content: Joi.string().trim().min(1).max(200),
  auth_key: Joi.string().required()
});

router.post('/add', (request, response) => {
  console.log('/POST /review/add');
  console.dir(request.body);

  const { error, value } = add_schema.validate(request.body);
  if (error) {
    response.writeHead(400, headers.JSON);
    response.end(JSON.stringify(validation_error_response));
    return;
  }

  restaurant_controller.addReview(value.restaurant_id, value.rating, value.title, value.content, value.auth_key)
    .then(review => {
      if (!review) {
        // User was not authorized to add a review
        response.writeHead(401, headers.JSON);
        response.end(JSON.stringify(unauthorized_response));
        return;
      }

      // Restaurant was not found (invalid ID)
      if (review === -1) {
        response.writeHead(404, headers.JSON);
        response.end(JSON.stringify(restaurant_not_found_response));
        return;
      }

      response.writeHead(200, headers.JSON);
      const valid_response = { response: 200, review: review };
      response.end(JSON.stringify(valid_response));
    })
    .catch(() => {
      response.writeHead(500, headers.JSON);
      response.end(JSON.stringify(internal_error_response));
    })
});

module.exports = router;