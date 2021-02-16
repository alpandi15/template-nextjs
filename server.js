import express from 'express'
import next from 'next'
import { join } from 'path'
import cookieParser from 'cookie-parser'
import { createServer } from 'http'

import { config } from './src/config'
import routes from './src/routers'

const portHttp = config.serverPort
const dev = process.env.NODE_ENV !== 'production'
const app = next({
  dev,
  dir: `${__dirname}/src`,
  xPoweredBy: false
})
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()
    server
    server
      .disable('x-powered-by')
      .set('X-Powered-By', 'Pandi')
      .use(cookieParser())
      .use((req, res, next) => {
        res.removeHeader('x-powered-by')
        next()
      })
    
    routes(server, app)

    server
      .get('*', (req, res) => {
        if (req.url.includes('/sw')) {
          const filePath = join(__dirname, 'src', 'static', 'sw.js')
          // console.log('SERVICE WORKER ', filePath)
          app.serveStatic(req, res, filePath)
        } else if (req.url.startsWith('static/workbox/')) {
          app.serveStatic(req, res, join(__dirname, req.url))
        } else {
          handle(req, res, req.url)
        }
      })
    
    createServer(server).listen(portHttp, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${portHttp}`)
    })
  })
  .catch(error => console.log('Error on Server render: ', error))