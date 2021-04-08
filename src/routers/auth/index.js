import express from 'express'
import renderAndCache from '../../utils/cache'

const router = express.Router()

const routes = (app) => {
  return router
    .get('/auth/login', (req, res) => renderAndCache(app, req, res, '/auth/login'))
    .get('/auth/register', (req, res) => renderAndCache(app, req, res, '/auth/register'))
    .get('/auth/forgot-password', (req, res) => renderAndCache(app, req, res, '/auth/forgot-password'))
    .get('/auth/forgot-password/verification', (req, res) => renderAndCache(app, req, res, '/auth/forgot-password/verification'))
    .get('/auth/reset-password', (req, res) => renderAndCache(app, req, res, '/auth/reset-password'))
}

export default routes
