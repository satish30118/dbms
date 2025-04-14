const { MongoClient } = require('mongodb');
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const app = express();

const url = 'mongodb://localhost:27017'; // MongoDB URL
const dbName = 'myDatabase'; // Your database name

let db;

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to MongoDB');
    db = client.db(dbName); // Store the database connection

    // Use routes
    app.use(express.json());
    app.use('/users', userRoutes(db)); // Pass db to routes
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
  });

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
