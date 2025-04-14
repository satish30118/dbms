const express = require('express');
const blogController = require('../controllers/blogController');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', authenticate, blogController.createBlog);
router.get('/blogs', authenticate, blogController.getAllBlogs);

module.exports = router;
