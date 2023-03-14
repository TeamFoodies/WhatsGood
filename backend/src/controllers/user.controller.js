const { mongo } = require('./database.controller');
const login_controller = require('./login.controller');

async function addFavorite(auth_key, restaurant_id) {
  const user = login_controller.userByKey(auth_key);
  if (!user || !user.isActive()) return false; // Not authorized to favorite a restaurant

  // Push the value to the favorites array
  await mongo().db('whatsgood').collection('users')
    .updateOne({username: user.username}, { $addToSet: { favorites: restaurant_id } });
  user.bump();
  return true;
}

async function removeFavorite(auth_key, restaurant_id) {
  const user = login_controller.userByKey(auth_key);
  if (!user || !user.isActive()) return false; // Not authorized to remove favorite

  await mongo().db('whatsgood').collection('users')
    .updateOne({username: user.username}, { $pull: { favorites: restaurant_id }})
  user.bump();
  return true;
}

exports.addFavorite = addFavorite;
exports.removeFavorite = removeFavorite;