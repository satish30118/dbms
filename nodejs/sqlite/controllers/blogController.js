const BlogModel = require('../models/blogModel');

const createBlog = (req, res) => {
  const { title, content } = req.body;
  const authorId = req.user.id; // Assume user is authenticated and `req.user.id` is set via middleware

  BlogModel.createBlog(title, content, authorId).then((blogId) => {
    res.status(201).json({ message: 'Blog created', blogId });
  }).catch((err) => {
    return res.status(500).send('Error creating blog')
  })
};

const getAllBlogs = (req, res) => {
  BlogModel.getAllBlogs((err, blogs) => {
    if (err) return res.status(500).send('Error fetching blogs');
    res.json({ blogs });
  });
};

// More CRUD operations for blog (get, update, delete) will be similar

module.exports = {
  createBlog,
  getAllBlogs,
};
