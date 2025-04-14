const express = require('express');
const { createNewBlog, getBlogs, updateExistingBlog, deleteExistingBlog } = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authMiddleware, createNewBlog);
router.get('/', getBlogs);
router.put('/:blogId', authMiddleware, updateExistingBlog);
router.delete('/:blogId', authMiddleware, deleteExistingBlog);

module.exports = router;
