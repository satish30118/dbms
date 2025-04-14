const db = require('../config/db');

const createBlog = async (title, content, authorId) => {
  const result = await db.query(
    'INSERT INTO blogs (title, content, author_id) VALUES ($1, $2, $3) RETURNING *',
    [title, content, authorId]
  );
  return result.rows[0];
};

module.exports = { createBlog };
