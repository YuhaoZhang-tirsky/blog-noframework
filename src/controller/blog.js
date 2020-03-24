const getList = (author, keyword) => {
  return [
    {
      author: author
    }
  ]
}

const getDetail = (id) => {
}

const newBlog = (blogData = {}) => {
  
  return {
    id: 3
  }
}

const updateBlog = (id, blogData = {}) => {
  return true
}

const deleteBlog = (id) => {
  return true
}



module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}