const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoute');
const blogRoutes = require('./routes/blogRoute');

dotenv.config();
const app = express();

// Middleware to parse JSON body
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
