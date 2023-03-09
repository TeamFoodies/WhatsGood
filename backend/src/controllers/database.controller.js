// Mongo connection
const { MongoClient } = require('mongodb');

// Singleton client
let client = undefined;

function getInstance() {
  if (!process.env.MONGO_CONNECTION_STRING) {
    console.error('MONGO_CONNECTION_STRING not specified in environment. Aborting launch.');
    return undefined;
  }

  if (client === undefined) client = new MongoClient(process.env.MONGO_CONNECTION_STRING)
  return client;
}

exports.mongo = getInstance;