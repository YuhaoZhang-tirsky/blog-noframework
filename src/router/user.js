const handleUserRouter = (req, res) => {
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]

  if (method === 'POST' && path === '/api/user/login') {
    return {
      msg: 'this is the api to login'
    }
  }
}

module.exports = handleUserRouter