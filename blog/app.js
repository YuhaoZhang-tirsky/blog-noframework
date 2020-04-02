const querystring = require('querystring')
const { get, set } = require('./src/db/redis')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
  return d.toGMTString()
}

//session data
//const SESSION_DATA = {}

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

  //query
  req.query = querystring.parse(url.split('?')[1])

  //cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || ''
  cookieStr.split(';').forEach(item => {
    if (!item) {
      return
    }
    const arr = item.split('=')
    const key = arr[0].trim()
    const val = arr[1].trim()
    req.cookie[key] = val
  })
  
  //session
  // let needSetCookie = false
  // let userId = req.cookie.userid
  // if (userId) {
  //   if (!SESSION_DATA[userId]) {
  //     SESSION_DATA[userId] = {}
  //   } 
  // } else {
  //   needSetCookie = true
  //   userId = `${Date.now()}_${Math.random()}`
  //   SESSION_DATA[userId] = {}
  // }
  // req.session = SESSION_DATA[userId]

  //session with redis
  let needSetCookie = false
  let userId = req.cookie.userid
  if (!userId) {
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    set(userId, {})
  }
  //get session
  req.sessionId = userId
  get(req.sessionId).then(sessionData => {
    if (sessionData == null) {
      set(req.sessionId, {})
      req.session = {}
    } else {
      req.session = sessionData
    }

    //handle post data
    return getPostData(req)
  })
  .then(postData => {
    req.body = postData
  
    const blogResult = handleBlogRouter(req, res)
    if (blogResult) {
      blogResult.then(blogData => {
        if (needSetCookie) {
          res.setHeader('Set-Cookie',`userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
        }
        res.end(
          JSON.stringify(blogData)
        )
      })
      return
    }
    
    //const blogData = handleBlogRouter
    // if (blogData) {
    //   res.end(
    //     JSON.stringify(blogData)
    //   )
    //   return
    // }

    const userResult = handleUserRouter(req, res)
    if (userResult) {
      userResult.then(userData => {
        if (needSetCookie) {
          res.setHeader('Set-Cookie',`userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
        }
        res.end(
          JSON.stringify(userData)
        )
      })
      return
    }
    // const userData = handleUserRouter(req, res)
    // if (userData) {
    //   res.end(
    //     JSON.stringify(userData)
    //   )
    //   return
    // }

    res.writeHead(404, {"Content-type": 'text/plain'})
    res.write("404 NOT FOUND\n")
    res.end()
  })
}

module.exports = serverHandle

//process.env.NODE_ENV