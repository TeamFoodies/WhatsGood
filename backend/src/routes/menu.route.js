const express = require('express');
const Joi = require('joi');
const router = express.Router();

const headers = require("../scripts/headers.script");
const restaurant_controller = require('../controllers/restaurant.controller');

const menu_item_schema = Joi.object().keys({
  name: Joi.string().required(),
  price: Joi.number().min(0).required(),
  description: Joi.string().optional()
});

const schema = Joi.object().keys({
  auth_key: Joi.string().required(),
  restaurant_id: Joi.string().required(),
  menu: Joi.array().items(menu_item_schema).required()
});

const validation_error_response = { response: 400, error: 'Invalid request.' };
const unauthorized_response = { response: 401, error: 'This key is invalid or expired. Are you logged in?' }
const internal_error_response = { response: 500, error: 'Internal error occurred.' };
const restaurant_not_found_response = { response: 404, error: 'Restaurant not found.' };
router.post('/', (request, response) => {
  console.log('POST /menu');
  console.dir(request.body);

  const { error, value } = schema.validate(request.body);
  if (error) {
    response.writeHead(400, headers.JSON);
    response.end(JSON.stringify(validation_error_response));
    return;
  }

  restaurant_controller.editMenu(value.restaurant_id, value.menu, value.auth_key)
    .then(restaurant => {
      if (!restaurant) {
        // User was not authorized to add a review
        response.writeHead(401, headers.JSON);
        response.end(JSON.stringify(unauthorized_response));
        return;
      }

      // Restaurant was not found (invalid ID)
      if (restaurant === -1) {
        response.writeHead(404, headers.JSON);
        response.end(JSON.stringify(restaurant_not_found_response));
        return;
      }

      response.writeHead(200, headers.JSON);
      const valid_response = { response: 200, restaurant: restaurant };
      response.end(JSON.stringify(valid_response));
    })
    .catch(error => {
      console.log(error);
      response.writeHead(500, headers.JSON);
      response.end(JSON.stringify(internal_error_response));
    })
});

module.exports = router;