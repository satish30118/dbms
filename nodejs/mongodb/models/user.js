const bcrypt = require('bcryptjs');

async function createUser(db, email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await db.collection('users').insertOne({
    email,
    password: hashedPassword,
    created_at: new Date(),
  });
  return result.insertedId;
}

async function findUserByEmail(db, email) {
  return db.collection('users').findOne({ email });
}

module.exports = { createUser, findUserByEmail };
