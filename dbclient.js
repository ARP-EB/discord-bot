const { MongoClient } = require('mongodb');
const config = require('./config.json');

const uri = config.uri;
const dbName = 'BOT';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');
    
    const db = client.db(dbName);

    // Add the collections you want to use
    const collections = {
      users: db.collection('users'),
      permissions: db.collection("users"),
      blogs: db.collection("blogs"),
      // Add more collections as needed
    };

    return collections;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

module.exports = { connectToDatabase };
