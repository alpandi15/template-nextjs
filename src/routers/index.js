import userRoutes from './user'

export default (server, app) => {
  server.use(userRoutes(app))
}