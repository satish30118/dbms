// Using the MongoDB native driver to interact with the database

const { ObjectId } = require('mongodb');

// Define user schema structure (just for understanding)
const userSchema = {
  name: String,
  email: { type: String, unique: true },
  age: Number,
  createdAt: { type: Date, default: Date.now },
};

// This will act as a "model" for interacting with MongoDB
const createUser = async (db, userData) => {
  const usersCollection = db.collection('users');
  const result = await usersCollection.insertOne(userData);
  return result.ops[0];
};

const getUsers = async (db) => {
  const usersCollection = db.collection('users');
  return usersCollection.find().toArray();
};

const getUserById = async (db, userId) => {
  const usersCollection = db.collection('users');
  return usersCollection.findOne({ _id: ObjectId(userId) });
};

const updateUser = async (db, userId, userData) => {
  const usersCollection = db.collection('users');
  const result = await usersCollection.updateOne(
    { _id: ObjectId(userId) },
    { $set: userData }
  );
  return result.modifiedCount > 0;
};

const deleteUser = async (db, userId) => {
  const usersCollection = db.collection('users');
  const result = await usersCollection.deleteOne({ _id: ObjectId(userId) });
  return result.deletedCount > 0;
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
