const crypto = require('crypto');

const { mongo } = require('./database.controller');
const login_controller = require('./login.controller');

async function getRestaurant(id) {
  return await mongo().db('whatsgood').collection('restaurants').findOne({id: id});
}

async function addRestaurant(name, address, latitude, longitude, auth_key) {
  // Get the user by authentication key
  const user = login_controller.userByKey(auth_key);
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
    },
    reviews: [],
    menu: {}
  }

  await mongo().db('whatsgood').collection('restaurants').insertOne(restaurant);
  // Bump the user's authentication key (refresh expiration timeout)
  user.bump();
  return restaurant;
}

async function addReview(restaurant_id, rating, title, content, auth_key) {
  // Get the user by authentication key
  const user = login_controller.userByKey(auth_key);
  if (!user || !user.isActive()) return undefined; // Not authorized to create a restaurant

  // Find the restaurant in our database
  const restaurant = await getRestaurant(restaurant_id);
  if (restaurant === null) return -1; // The restaurant does not exist

  // Generate the ID and the timestamp restaurant is created
  const id = crypto.randomUUID();
  const timestamp = Date.now();

  // Create the review object
  const review = {
    id: id,
    creation_timestamp: timestamp,
    author: user.username, // Type: Authorization (authorization.model)
    rating: rating,
    title: title,
    content: content
  }

  // Add review to the restaurant's reviews
  await mongo().db('whatsgood').collection('restaurants').updateOne({id: restaurant_id},
  {
    $push: {
      reviews: review
    }
  });
  // Bump the user's authentication key (refresh expiration timeout)
  user.bump();
  return review;
}

async function getCondensedRestaurantList() {
  return await mongo().db('whatsgood').collection('restaurants').find({ }).project({ id: 1, name: 1, _id: 0 }).toArray();
}

exports.getRestaurant = getRestaurant;
exports.addRestaurant = addRestaurant;
exports.addReview = addReview;
exports.getCondensedRestaurantList = getCondensedRestaurantList;