const { MongoClient } = require('mongodb');
const { uri, dbName } = require("./config.json");

const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');
    return client.db(dbName); // Make sure to return the specific database
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

module.exports = { connectToDatabase };
