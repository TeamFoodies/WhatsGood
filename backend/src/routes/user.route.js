const express = require('express');
const Joi = require('joi');
const router = express.Router();

const headers = require('../scripts/headers.script');
const login_controller = require('../controllers/login.controller');

const validation_error_response = { response: 400, error: 'Invalid request.' };
const internal_error_response = { response: 500, error: 'Internal error occurred.' };
const user_not_found_response = { response: 404, error: 'User not found.' };

const id_schema = Joi.object().keys({
  user_id: Joi.string().required()
});

router.get('/id/:user_id', (request, response) => {
  console.log('GET /user/id/:user_id');
  console.dir(request.params);

  const { error, value } = id_schema.validate(request.params);
  if (error) {
    response.writeHead(400, headers.JSON);
    response.end(JSON.stringify(validation_error_response));
    return;
  }

  login_controller.getUserPublicFacing(value.user_id)
    .then(user => {
      if (!user || user.length === 0) {
        response.writeHead(404, headers.JSON);
        response.end(JSON.stringify(user_not_found_response));
        return;
      }

      const success_response = { response: 200, user: user[0] };
      response.writeHead(200, headers.JSON);
      response.end(JSON.stringify(success_response));
    })
    .catch(error => {
      console.log(error);
      response.writeHead(500, headers.JSON);
      response.end(JSON.stringify(internal_error_response));
    })
});

exports.router = router;
exports.id_schema = id_schema;