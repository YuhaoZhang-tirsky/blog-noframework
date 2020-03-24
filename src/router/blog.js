const { 
  getList, 
  getDetail, 
  newBlog, 
  updateBlog, 
  deleteBlog } = require('../controller/blog')
const querystring = require('querystring')

const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
  const method = req.method
  const id = req.query.id

  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    const listData = getList(author, keyword)
    return new SuccessModel(listData)
  }

  if (method === 'GET' && req.path === '/api/blog/detail') { 
    const data = getDetail(id)
    return new SuccessModel(data)
  }

  if (method === 'POST' && req.path === '/api/blog/new') {
    const data = newBlog(req.body)
    return new SuccessModel(data)
  }

  if (method === 'POST' && req.path === '/api/blog/update') {
    const result = updateBlog(id, req.body)
    if (result) {
      return new SuccessModel()
    } else {
      return new ErrorModel('update error')
    }
  }

  if (method === 'POST' && req.path === '/api/blog/delete') {
    const result = deleteBlog(id)
    if (result) {
      return new SuccessModel()
    } else {
      return new ErrorModel('delete error')
    }
  }
}

module.exports = handleBlogRouter