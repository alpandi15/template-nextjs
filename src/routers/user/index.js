import express from 'express'
import renderCache from '../../utils/cache'

const router = express.Router()

const routes = (app) => {
  return router
    .get('/user', (req, res) => renderCache(app, req, res, '/user'))
}

export default routes
