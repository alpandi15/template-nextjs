import { request } from 'services/utils/request'

const apiEditProfile = async (data, guard = 'user') => {
  console.log('GUARD ', guard)
  return request({
    url: 'profile-update',
    auth: true,
    data,
    method: 'put',
    guard
  })
}

const apiChangePassword = async (data, guard = 'user') => {
  return request({
    url: 'auth/change-password',
    auth: true,
    data,
    method: 'put',
    guard
  })
}

const apiChangeEmail = async (data, guard = 'user') => {
  return request({
    url: 'profile-update/email',
    auth: true,
    data,
    method: 'put',
    guard
  })
}

const apiChangePhone = async (data, guard = 'user') => {
  return request({
    url: 'profile-update/phone',
    auth: true,
    data,
    method: 'put',
    guard
  })
}

const apiSendCode = async (type, guard = 'user') => {
  return request({
    url: `auth/request-verify/${type}`,
    auth: true,
    method: 'post',
    guard
  })
}

const apiVerifyCode = async (data, guard = 'user') => {
  return request({
    url: 'auth/verification',
    auth: true,
    data,
    method: 'post',
    guard
  })
}

export {
  apiEditProfile,
  apiChangePassword,
  apiChangeEmail,
  apiChangePhone,
  apiSendCode,
  apiVerifyCode
}
