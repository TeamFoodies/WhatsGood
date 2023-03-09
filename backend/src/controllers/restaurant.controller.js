const crypto = require('crypto');

const { mongo } = require('./database.controller');
const login_controller = require('./login.controller');

async function createRestaurant(name, address, latitude, longitude, authentication_key) {
  // Get the user by authentication key
  const user = login_controller.userByKey(authentication_key);
  if (!user || !user.isActive()) return undefined; // Not authorized to create a restaurant

  // Generate the ID and the timestamp restaurant is created
  const id = crypto.randomUUID();
  const timestamp = Date.now();

  // Create the restaurant object
  const restaurant = {
    id: id,
    creation_timestamp: timestamp,
    author: user.username, // Type: Authorization (authorization.model)
    name: name,
    address: address,
    position: {
      latitude: latitude,
      longitude: longitude
    }
  }

  await mongo().db('whatsgood').collection('restaurants').insertOne(restaurant);
  // Bump the user's authentication key (refresh expiration timeout)
  user.bump();
  return restaurant;
}

exports.createRestaurant = createRestaurant;