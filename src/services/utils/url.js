import {
  config
} from 'config'

const {
  apiProtocol,
  apiHost,
  apiPort,
  apiVersion
} = config

const APIURL = `${apiProtocol}://${apiHost}:${apiPort}/${apiVersion}`
const APIUPLOAD = `${config.apiImageProtocol}://${config.apiImage}:${config.apiImagePort}${config.apiImageVersion}`

export {
  APIURL,
  APIUPLOAD
}
