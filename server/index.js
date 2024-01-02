import './firebaseConfig.js'

import { getAuth } from 'firebase-admin/auth'
import jsonServer from 'json-server'

const server = jsonServer.create()
const router = jsonServer.router('server/db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization

    if (authorizationHeader) {
      const accessToken = authorizationHeader.split(' ')[1]
      await getAuth().verifyIdToken(accessToken)

      return next()
    }
    return res.status(401).jsonp({
      message: 'Unauthorized',
    })
  } catch (error) {
    return res.status(403).jsonp({
      message: 'Invalid token',
      error: error,
    })
  }
})
server.use(router)
server.listen(3333, () => {
  console.log('JSON Server is running')
})
