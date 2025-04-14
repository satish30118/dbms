const express = require('express');
const router = express.Router();
const {
  addUser,
  getAllUsers,
  getUser,
  updateUserData,
  removeUser,
} = require('../controllers/userController');

const userRoutes = (db) => {
  router.post('/', (req, res) => addUser(req, res));
  router.get('/', (req, res) => getAllUsers(req, res));
  router.get('/:id', (req, res) => getUser(req, res));
  router.put('/:id', (req, res) => updateUserData(req, res));
  router.delete('/:id', (req, res) => removeUser(req, res));

  // Attach db to request object
  router.use((req, res, next) => {
    req.db = db;
    next();
  });

  return router;
};

module.exports = userRoutes;
