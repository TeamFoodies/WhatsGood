const express = require('express');
const Joi = require('joi');
const router = express.Router();

const headers = require('../scripts/headers.script');
const restaurant_controller = require('../controllers/restaurant.controller');

const validation_error_response = { response: 400, error: 'Invalid request.' };
const internal_error_response = { response: 500, error: 'Internal error occurred.' };
const unauthorized_response = { response: 401, error: 'Not authenticated to create a restaurant. Are you logged in?' };
const restaurant_not_found_response = { response: 404, error: 'Restaurant not found.' };

const add_schema = Joi.object().keys({
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

const id_schema = Joi.object().keys({
  restaurant_id: Joi.string().required()
});

router.get('/list', (request, response) => {
  console.log('GET /restaurant/list');

  restaurant_controller.getCondensedRestaurantList()
    .then(list => {
      const success_response = { response: 200, restaurants: list };
      response.writeHead(200, headers.JSON);
      response.end(JSON.stringify(success_response));
    })
    .catch(error => {
      console.log(error);
      response.writeHead(500, headers.JSON);
      response.end(JSON.stringify(internal_error_response));
    })
});

// Page to make user specify id
router.get('/id', (request, response) => {
  console.log('GET /restaurant/id')
  response.writeHead(404, headers.JSON);
  response.end(JSON.stringify(restaurant_not_found_response));
})

// View restaurant based on ID
router.get('/id/:restaurant_id', (request, response) => {
  console.log('GET /restaurant/id/:restaurant_id');
  console.dir(request.params);

  const { error, value } = id_schema.validate(request.params);
  if (error) {
    response.writeHead(400, headers.JSON);
    response.end(JSON.stringify(validation_error_response));
    return;
  }

  restaurant_controller.getRestaurant(value.restaurant_id)
    .then(restaurant => {
      // No restaurant matching the ID provided
      if (!restaurant) {
        response.writeHead(404, headers.JSON);
        response.end(JSON.stringify(restaurant_not_found_response));
        return;
      }

      const success_response = { response: 200, restaurant: restaurant };
      response.writeHead(200, headers.JSON);
      response.end(JSON.stringify(success_response));
    })
    .catch(error => {
      console.log(error);
      response.writeHead(500, headers.JSON);
      response.end(JSON.stringify(internal_error_response));
    });
});

router.post('/add', (request, response) => {
  console.log('POST /restaurant/add');
  console.dir(request.body);

  const { error, value } = add_schema.validate(request.body);
  if (error) {
    response.writeHead(400, headers.JSON);
    response.end(JSON.stringify(validation_error_response));
    return;
  }

  restaurant_controller.addRestaurant(value.name, value.address, value.latitude, value.longitude, value.auth_key)
    .then(restaurant => {
      if (!restaurant) {
        // User was not authorized to add a restaurant
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
    });
});

module.exports = router;