const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const { JWT_SECRET } = process.env;

// Register User
const registerUser = (req, res) => {
  const { username, email, password } = req.body;

  UserModel.findUserByEmail(email, (err, existingUser) => {
    if (err) return res.status(500).send('Error checking user');
    if (existingUser) return res.status(400).send('User already exists');

    UserModel.createUser(username, email, password, (err, userId) => {
      if (err) return res.status(500).send('Error creating user');
      const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(201).json({ message: 'User registered', token });
    });
  });
};

// Login User
const loginUser = (req, res) => {
  const { email, password } = req.body;

  UserModel.findUserByEmail(email, (err, user) => {
    if (err || !user) return res.status(400).send('Invalid credentials');
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  });
};

module.exports = {
  registerUser,
  loginUser,
};
