const CryptoJS = require('crypto-js');
const nanoid = import('nanoid');

const Authorization = require('../models/authorization.model');
const { mongo } = require('./database.controller');

// Holder for authorization keys, mapped to users
let authorizedKeys = {};

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

  // Hash the password
  const hash = hashPassword(password);

  await mongo().db('whatsgood').collection('users').insertOne({username: username, password: hash});
  return login(username, password);
}

// Returns the authorized key
async function login(username, password) {
  // Hash the password
  const hash = hashPassword(password);

  let foundUser = await mongo().db('whatsgood').collection('users').findOne({username: username, password: hash});
  if (!foundUser) return undefined;

  // Create authorization for login
  const key = (await nanoid).nanoid();
  authorizedKeys[key] = new Authorization(key, username);

  return key;
}

// https://medium.com/@dimple.shanbhag/password-authentication-using-crypto-js-c278a4a1f4a9 (strategy 2)
function hashPassword(password) {
  const hash = CryptoJS.HmacSHA256(password, process.env.CRYPTO_KEY);
  return CryptoJS.enc.Base64.stringify(hash);
}

// Returns the user associated with an authentication key
// Returns undefined if the key is invalid
function userByKey(auth_key) {
  return authorizedKeys[auth_key];
}

// Returns true if the authorization key was valid
// False if the key was expired or invalid
function logout(auth_key) {
  const authorization = authorizedKeys[auth_key];
  authorizedKeys[auth_key] = undefined;
  return (authorization) && authorization.isActive();
}

exports.authorizedKeys = authorizedKeys;
exports.login = login;
exports.isUsernameTaken = isUsernameTaken;
exports.createAccount = createAccount;
exports.userByKey = userByKey;
exports.logout = logout;