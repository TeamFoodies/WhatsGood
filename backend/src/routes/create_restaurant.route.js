const express = require('express');
const Joi = require('joi');
const router = express.Router();

const headers = require('../scripts/headers.script');
const restaurant_controller = require('../controllers/restaurant.controller');

const validation_error_response = { response: 400, error: 'Invalid request.' };
const internal_error_response = { response: 500, error: 'Internal error occurred.' };
const unauthorized_response = { response: 401, error: 'Not authenticated to create a restaurant. Are you logged in?' }

const schema = Joi.object().keys({
  name: Joi.string()
    .trim()
    .min(1)
    .max(30)
    .required(),
  address: Joi.string().optional(),
  latitude: Joi.number().min(-90).max(90).required(), // LATITUDE: [-90, 90]
  longitude: Joi.number().min(-180).max(180).invalid(180).required(), // LONGITUDE: [-180, 180)
  auth_key: Joi.string().required()
});

router.post('/', (request, response) => {
  console.log('POST /create_restaurant');
  console.dir(request.body);

  const { error, value } = schema.validate(request.body);
  if (error) {
    response.writeHead(400, headers.JSON);
    response.end(JSON.stringify(validation_error_response));
    return;
  }

  restaurant_controller.createRestaurant(value.name, value.address, value.latitude, value.longitude, value.auth_key)
    .then(restaurant => {
      if (!restaurant) {
        // User was not authorized to create a restaurant (n
        response.writeHead(401, headers.JSON);
        response.end(JSON.stringify(unauthorized_response));
        return;
      }

      response.writeHead(200, headers.JSON);
      const valid_response = { response: 200, restaurant: restaurant };
      response.end(JSON.stringify(valid_response));
    })
    .catch(() => {
      response.writeHead(500, headers.JSON);
      response.end(JSON.stringify(internal_error_response));
    })
});

module.exports = router;