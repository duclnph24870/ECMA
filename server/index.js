const jsonServer = require('json-server')
const cors = require('cors')

const server = jsonServer.create()
const router = jsonServer.router('server/db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(cors())
server.use(middlewares)

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

server.get('/users/me', async (req, res) => {
  const token = req.headers.authorization
  if (!token)
    return res.status(401).jsonp({
      message: 'Unauthorized',
    })
  const id = token?.split(' ')[1] || 1
  const response = await fetch('http://localhost:3000/users/' + id)
  const user = await response.json()
  if (!user || Object.keys(user).length === 0)
    return res.status(401).jsonp({
      message: 'Unauthorized',
    })
  return res.jsonp(user)
})

router.render = (req, res) => {
  if (req.method === 'GET' && req.originalUrl.indexOf('/users') > -1) {
    const newRes = Array.isArray(res?.locals?.data)
      ? res?.locals?.data?.map((item) => ({
          ...item,
          password: undefined,
        }))
      : { ...res?.locals?.data, password: undefined }
    res.jsonp(newRes)
  } else {
    res.jsonp(res.locals.data)
  }
}

// Use default router
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
