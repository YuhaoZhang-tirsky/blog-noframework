const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

//handle post data
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
       resolve({})
       return
    }
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(
        JSON.parse(postData)
      )
    })
  })
  return promise
} 

const serverHandle = (req, res) => {
  res.setHeader('Content-type', 'application/json')

  const url = req.url
  req.path = url.split('?')[0]

  req.query = querystring.parse(url.split('?')[1])

  getPostData(req).then(postData => {
    req.body = postData
  
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
  })
}

module.exports = serverHandle

//process.env.NODE_ENV