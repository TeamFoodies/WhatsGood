const { mongo } = require('./database.controller');

// Temporary holder for authorized keys
const authorizedKeys = [ 'EXAMPLE_KEY' ];

// Returns if the username is taken (useful during account creation)
async function isUsernameTaken(username) {
  const entry = await mongo().db('whatsgood').collection('users').findOne({username: username});
  console.log(entry);
  console.log(entry !== null);
  return entry !== null;
}

// Returns the authorized key
function login(username, password) {
  // TEMPORARY: look for hardcoded username and password
  if (username === 'JohnD' && password === 'Foodie100') {
    return authorizedKeys[0];
  } else {
    return null;
  }
}

exports.authorizedKeys = authorizedKeys;
exports.login = login;
exports.isUsernameTaken = isUsernameTaken;