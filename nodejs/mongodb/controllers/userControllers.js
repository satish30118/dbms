const { db } = require('../config/db');
const { createUser, findUserByEmail } = require('../models/user');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key';  // Use a more secure secret in production

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await findUserByEmail(db, email);
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    const userId = await createUser(db, email, password);
    res.status(201).send({ userId });
  } catch (error) {
    res.status(500).send('Error registering user');
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(db, email);
    if (!user) {
      return res.status(400).send('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).send('Error logging in');
  }
};

module.exports = { registerUser, loginUser };
