const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
  return d.toGMTString()
}

const handleUserRouter = (req, res) => {
  const method = req.method

  //login
  // if (method === 'POST' && req.path === '/api/user/login') {
  //   const { username, password } = req.body
  //   const result = login(username, password)
  //   return result.then(data => {
  //     if (data.username) {
  //       return new SuccessModel()
  //     }
  //     return new ErrorModel('login error')
  //   })
  // }

  if (method === 'GET' && req.path === '/api/user/login') {
    const { username, password } = req.query
    const result = login(username, password)
    return result.then(data => {
      if (data.username) {

        res.setHeader('Set-Cookie',`username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`)

        return new SuccessModel()
      }
      return new ErrorModel('login error')
    })
  }

  //logincheck
  if (method === 'GET' && req.path === '/api/user/login-test') {
    if (req.cookie.username) {
      return Promise.resolve(new SuccessModel({username: req.cookie.username}))
    }
    return Promise.resolve (new ErrorModel('not login yet'))
  }
}

module.exports = handleUserRouter