const { createBlog } = require('../models/blogModel');

exports.create = async (req, res) => {
  const { title, content, authorId } = req.body;
  try {
    const blog = await createBlog(title, content, authorId);
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Error creating blog', details: err.message });
  }
};
