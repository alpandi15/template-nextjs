import dotenv from 'dotenv'

dotenv.config()

const config = {
  env: process.env.NODE_ENV,
  apiProtocol: process.env.API_PROTOCOL || 'http',
  apiHost: process.env.API_HOST || 'localhost',
  apiPort: process.env.API_PORT || '3000',
  apiVersion: process.env.API_VERSION || 'v1/',
  appIdGoogle: process.env.ID_GOOGLE || '',
  appIdFacebook: process.env.ID_FACEBOOK || '',

  apiImageProtocol: process.env.API_IMAGE_PROTOCOL || 'http',
  apiImage: process.env.API_IMAGE || 'localhost',
  apiImagePort: process.env.API_IMAGE_PORT || '3000',
  apiImageVersion: process.env.API_IMAGE_VERSION || '',

  serverPort: process.env.PORT_HTTP || '8000',
  serverPortHttps: process.env.PORT_HTTPS || '443'
}

config.APIURL = `${config.apiProtocol}://${config.apiHost}:${config.apiPort}/${config.apiVersion}`
config.APIUPLOAD = `${config.apiImageProtocol}://${config.apiImage}:${config.apiImagePort}${config.apiImageVersion}`

export {
  config
}
