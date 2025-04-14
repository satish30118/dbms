const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('../models/user');

const addUser = async (req, res) => {
  const userData = req.body;
  try {
    const newUser = await createUser(req.db, userData); // Pass the db to the model function
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await getUsers(req.db);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(req.db, id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUserData = async (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  try {
    const updated = await updateUser(req.db, id, userData);
    if (!updated) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const removeUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await deleteUser(req.db, id);
    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addUser,
  getAllUsers,
  getUser,
  updateUserData,
  removeUser,
};
