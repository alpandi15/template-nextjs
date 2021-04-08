import { request } from 'services/utils/request'

export async function apiForgotPassword (type = 'email', data) {
  return request({
    url: `auth/forgot-password/${type}`,
    auth: false,
    data,
    method: 'post'
  })
}
