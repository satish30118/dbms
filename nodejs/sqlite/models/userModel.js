const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Create User Table (if not exists)
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    password TEXT
)`);

// Create a new user
const createUser = (username, email, password, callback) => {
  const hashedPassword = bcrypt.hashSync(password, 10); // Hash the password
  db.run(
    `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
    [username, email, hashedPassword],
    function (err) {
      callback(err, this.lastID);
    }
  );
};

// Find a user by email
const findUserByEmail = (email, callback) => {
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
    callback(err, row);
  });
};

module.exports = {
  createUser,
  findUserByEmail,
};
