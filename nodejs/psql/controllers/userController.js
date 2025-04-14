const { createUser, findUserByEmail } = require('../models/userModel');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await createUser(email, password);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error creating user', details: err.message });
  }
};
