const { createBlog, getBlogs } = require('../models/blogModel');

const create = async (req, res) => {
  const { title, content, authorId } = req.body;
  const blogId = await createBlog(title, content, authorId);
  res.status(201).json({ message: 'Blog created', blogId });
};

const list = async (req, res) => {
  const blogs = await getBlogs();
  res.status(200).json(blogs);
};

module.exports = { create, list };
