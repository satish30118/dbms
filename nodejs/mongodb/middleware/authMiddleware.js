const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key';  // Use a more secure secret in production

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(403).send('Token missing');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).send('Invalid token');
  }
};

module.exports = authMiddleware;
