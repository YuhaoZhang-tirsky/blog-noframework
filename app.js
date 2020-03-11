const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const serverHandle = (req, res) => {
  res.setHeader('Content-type', 'application/json')
 
  const blogData = handleBlogRouter(req, res)
  const userData = handleUserRouter(req, res)

  if (blogData) {
    res.end(
      JSON.stringify(blogData)
    )
    return
  }

  if (userData) {
    res.end(
      JSON.stringify(userData)
    )
    return
  }

  res.writeHead(404, {"Content-type": 'text/plain'})
  res.write("404 NOT FOUND\n")
  res.end()
}

module.exports = serverHandle

//process.env.NODE_ENV