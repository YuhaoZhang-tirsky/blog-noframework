const handleBlogRouter = (req, res) => {
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]

  if (method === 'GET' && path === '/api/blog/list') {
    return {
      msg: 'this is the api for get blog list'
    }
  }

  if (method === 'GET' && path === '/api/blog/detail') {
    return {
      msg: 'this is the api to get blog detail'
    }
  }

  if (method === 'POST' && path === '/api/blog/new') {
    return {
      msg: 'this is the api to create a new blog'
    }
  }

  if (method === 'POST' && path === '/api/blog/update') {
    return {
      msg: 'this is the api to update a new blog'
    }
  }

  if (method === 'POST' && path === '/api/blog/delete') {
    return {
      msg: 'this is the api to delete a new blog'
    }
  }
}

module.exports = handleBlogRouter