# MongoDB Integration with Node.js 🚀

A comprehensive guide to connecting and interacting with MongoDB using **Mongoose ODM** and the **Native MongoDB Driver** in Node.js.

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?logo=mongodb&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)

---

## Table of Contents 📑
- [Introduction](#introduction-)
- [Connecting with Mongoose](#connecting-to-mongodb-using-mongoose-)
- [Connecting with Native Driver](#connecting-to-mongodb-using-native-mongodb-driver-)
- [Common Operations](#common-operations-)
- [Use Cases](#use-cases-)
- [Conclusion](#conclusion-)

---

## Introduction 📚
MongoDB is a NoSQL database for storing unstructured data. This guide demonstrates two approaches to interact with MongoDB in Node.js:
1. **Mongoose**: An ODM library for schema-based data modeling.
2. **Native MongoDB Driver**: A low-level driver for direct database access.

---

## Connecting to MongoDB using Mongoose 🦉

### Installation
```bash
npm install mongoose
```

```bash

const mongoose = require('mongoose');

// Connect to MongoDB
const uri = 'mongodb://localhost:27017/myDatabase'; // Replace with your URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected via Mongoose'))
  .catch(err => console.error('Connection error:', err));

// Define a schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});
const User = mongoose.model('User', userSchema);

// CRUD Operations
const createUser = async () => {
  const newUser = new User({ 
    name: 'John Doe', 
    email: 'johndoe@example.com', 
    age: 30 
  });
  await newUser.save();
  console.log('User created');
};

const getUsers = async () => {
  const users = await User.find();
  console.log('Users:', users);
};

// Execute
createUser();
getUsers();
```

Connecting to MongoDB using Native MongoDB Driver 🛠️
Installation

```bash
npm install mongodb

```
```bash
const { MongoClient } = require('mongodb');

// Connect to MongoDB
const uri = 'mongodb://localhost:27017'; // Replace with your URI
const dbName = 'myDatabase';

async function connectToMongoDB() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
  try {
    await client.connect();
    console.log('MongoDB connected via Native Driver');
    
    const db = client.db(dbName);
    const usersCollection = db.collection('users');
    
    // CRUD Operations
    const userData = { name: 'John Doe', email: 'johndoe@example.com', age: 30 };
    const insertResult = await usersCollection.insertOne(userData);
    console.log('User created:', insertResult.insertedId);
    
    const users = await usersCollection.find().toArray();
    console.log('Users:', users);
    
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
  }
}

// Execute
connectToMongoDB();