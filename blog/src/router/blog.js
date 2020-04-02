const { 
  getList, 
  getDetail, 
  newBlog, 
  updateBlog, 
  deleteBlog } = require('../controller/blog')
const querystring = require('querystring')

const { SuccessModel, ErrorModel } = require('../model/resModel')

//login check
const loginCheck = (req) => {
  if (!req.session.username) {
    return Promise.resolve(
       new ErrorModel('not login yet')
    )
  }
}

const handleBlogRouter = (req, res) => {
  const method = req.method
  const id = req.query.id
  const loginCheckResult = loginCheck(req)

  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    // const listData = getList(author, keyword)
    // return new SuccessModel(listData)
    const result = getList(author, keyword)
    return result.then(listData => {
      return new SuccessModel(listData)
    })
  }

  if (method === 'GET' && req.path === '/api/blog/detail') { 
    const result = getDetail(id)
    return result.then(blogData => {
      return new SuccessModel(blogData)
    })

  }

  if (method === 'POST' && req.path === '/api/blog/new') {
    // const data = newBlog(req.body)
    // return new SuccessModel(data)

    if (loginCheckResult) {
      // didn't login
      return loginCheckResult
    }

    req.body.author = req.session.username
    const result = newBlog(req.body)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }

  if (method === 'POST' && req.path === '/api/blog/update') {
    if (loginCheckResult) {
      // didn't login
      return loginCheckResult
    }
    
    const result = updateBlog(id, req.body)
    return result.then(val => {
      if (val) {
        return new SuccessModel()
      } else {
        return new ErrorModel('update error')
      }
    })
    
  }

  if (method === 'POST' && req.path === '/api/blog/delete') {
    if (loginCheckResult) {
      // didn't login
      return loginCheckResult
    }
    
    const author = req.session.username
    const result = deleteBlog(id, author)
    return result.then(val => {
      if (val) {
        return new SuccessModel()
      } else {
        return new ErrorModel('delete error')
      }
    })
  }
}

module.exports = handleBlogRouter