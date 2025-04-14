
const { db } = require('../config/db');
const { createBlog, getAllBlogs, updateBlog, deleteBlog } = require('../models/blog');

const createNewBlog = async (req, res) => {
  const { title, content } = req.body;
  const { userId } = req.user;

  try {
    const blogId = await createBlog(db, title, content, userId);
    res.status(201).json({ blogId });
  } catch (error) {
    res.status(500).send('Error creating blog');
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await getAllBlogs(db);
    res.json(blogs);
  } catch (error) {
    res.status(500).send('Error fetching blogs');
  }
};

const updateExistingBlog = async (req, res) => {
  const { blogId } = req.params;
  const updatedData = req.body;

  try {
    await updateBlog(db, blogId, updatedData);
    res.send('Blog updated');
  } catch (error) {
    res.status(500).send('Error updating blog');
  }
};

const deleteExistingBlog = async (req, res) => {
  const { blogId } = req.params;

  try {
    await deleteBlog(db, blogId);
    res.send('Blog deleted');
  } catch (error) {
    res.status(500).send('Error deleting blog');
  }
};

module.exports = { createNewBlog, getBlogs, updateExistingBlog, deleteExistingBlog };
