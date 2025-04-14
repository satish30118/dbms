const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // Use your MongoDB URI here
const dbName = 'myDatabase';

let db;

async function connectToDatabase() {
  try {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    db = client.db(dbName);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

module.exports = { connectToDatabase, db };
