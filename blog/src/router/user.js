const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { set } = require('../db/redis')

const handleUserRouter = (req, res) => {
  const method = req.method

  if (method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body
    const result = login(username, password)
    return result.then(data => {
      if (data.username) {
        //res.setHeader('Set-Cookie',`username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`)
        req.session.username = data.username
        req.session.realname = data.username
        //set redis
        set(req.sessionId, req.session)
        return new SuccessModel({
          session: req.session
        })
      }
      return new ErrorModel('login error')
    })
  }

  //logincheck
  // if (method === 'GET' && req.path === '/api/user/login-test') {
  //   if (req.session.username) {
  //     return Promise.resolve(new SuccessModel({session: req.session}))
  //   }
  //   return Promise.resolve (new ErrorModel('not login yet'))
  // }
}

module.exports = handleUserRouter