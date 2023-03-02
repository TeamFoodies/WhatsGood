const { mongo } = require('./database.controller');

// Temporary holder for authorized keys
const authorizedKeys = [ 'EXAMPLE_KEY' ];

// Returns if the username is taken (useful during account creation)
async function isUsernameTaken(username) {
  const entry = await mongo().db('whatsgood').collection('users').findOne({username: username});
  return entry !== null;
}

// Create account, return undefined if account creation was unsuccessful, otherwise return key
async function createAccount(username, password) {
  const taken = await isUsernameTaken(username);
  if (taken) {
    return undefined;
  }

  await mongo().db('whatsgood').collection('users').insertOne({username: username, password: password});
  return authorizedKeys[0];
}

// Returns the authorized key
async function login(username, password) {
  let foundUser = await mongo().db('whatsgood').collection('users').findOne({username: username, password: password});
  return foundUser === null ? undefined : authorizedKeys[0];
}

exports.authorizedKeys = authorizedKeys;
exports.login = login;
exports.isUsernameTaken = isUsernameTaken;
exports.createAccount = createAccount;