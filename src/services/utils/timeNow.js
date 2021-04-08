import { request } from './request'

const apiTimeNow = () => {
  return request({
    url: 'utils/now',
    auth: false,
    method: 'get'
  })
}

export {
  apiTimeNow
}
