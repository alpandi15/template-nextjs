import { request } from 'services/utils/request'

const apiResetPassword = async (type = 'email', data) => {
  return request({
    url: `auth/reset-password/${type}`,
    auth: false,
    data,
    method: 'post'
  })
}

export {
  apiResetPassword
}
