const { getList, getDetail } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
  const method = req.method

  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    const listData = getList(author, keyword)
    return new SuccessModel(listData)
  }

  if (method === 'GET' && req.path === '/api/blog/detail') {
    const id = req.query.id
    const data = getDetail(id)
    return new SuccessModel(data)
  }

  if (method === 'POST' && req.path === '/api/blog/new') {
    return {
      msg: 'this is the api to create a new blog'
    }
  }

  if (method === 'POST' && req.path === '/api/blog/update') {
    return {
      msg: 'this is the api to update a new blog'
    }
  }

  if (method === 'POST' && req.path === '/api/blog/delete') {
    return {
      msg: 'this is the api to delete a new blog'
    }
  }
}

module.exports = handleBlogRouter