async function createBlog(db, title, content, authorId) {
    const result = await db.collection('blogs').insertOne({
      title,
      content,
      author_id: authorId,
      created_at: new Date(),
    });
    return result.insertedId;
  }
  
  async function getAllBlogs(db) {
    return db.collection('blogs').find().toArray();
  }
  
  async function updateBlog(db, blogId, updatedData) {
    return db.collection('blogs').updateOne(
      { _id: new ObjectId(blogId) },
      { $set: updatedData }
    );
  }
  
  async function deleteBlog(db, blogId) {
    return db.collection('blogs').deleteOne({ _id: new ObjectId(blogId) });
  }
  
  module.exports = { createBlog, getAllBlogs, updateBlog, deleteBlog };
  