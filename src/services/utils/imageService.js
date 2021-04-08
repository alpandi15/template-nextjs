import { request } from 'services/utils/request'
import { APIUPLOAD } from './url'

// User
const apiUpload = async (type = 'product', data, guard) => {
  return request({
    url: `${APIUPLOAD}/image/upload/${type}`,
    fullUrl: true,
    auth: true,
    data,
    method: 'post',
    guard
  })
}

export {
  apiUpload
}
