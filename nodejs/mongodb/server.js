const express = require('express');
const bodyParser = require('body-parser');
const { connectToDatabase } = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);

connectToDatabase();

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
