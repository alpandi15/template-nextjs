import express from 'express'
import renderCache from '../../utils/cache'

const router = express.Router()

const routes = (app) => {
  return router
    .get('/home', (req, res) => renderCache(app, req, res, '/home'))
}

export default routes
