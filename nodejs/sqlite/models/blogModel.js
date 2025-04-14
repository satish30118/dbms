const db = require('../config/db');

// Create Blog Table (if not exists)
db.run(`CREATE TABLE IF NOT EXISTS blogs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT,
    author_id INTEGER,
    FOREIGN KEY (author_id) REFERENCES users(id)
)`);

// Create a new blog
const createBlog = (title, content, authorId) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO blogs (title, content, author_id) VALUES (?, ?, ?)`,
      [title, content, authorId],
      function (err) {
        if (err) reject(err)
        resolve(this.lastID)
      }
    );
  })

};

// Get all blogs
const getAllBlogs = (callback) => {
  db.all('SELECT * FROM blogs', (err, rows) => {
    callback(err, rows);
  });
};

// Get blog by ID
const getBlogById = (id, callback) => {
  db.get('SELECT * FROM blogs WHERE id = ?', [id], (err, row) => {
    callback(err, row);
  });
};

// Update a blog
const updateBlog = (id, title, content, callback) => {
  db.run(
    'UPDATE blogs SET title = ?, content = ? WHERE id = ?',
    [title, content, id],
    (err) => {
      callback(err);
    }
  );
};

// Delete a blog
const deleteBlog = (id, callback) => {
  db.run('DELETE FROM blogs WHERE id = ?', [id], (err) => {
    callback(err);
  });
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
