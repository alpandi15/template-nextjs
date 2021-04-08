import { request } from '../utils/request'

const apiSendCode = async (type) => {
  return request({
    url: `auth/request-verify/${type}`,
    auth: true,
    method: 'get'
  })
}

const verificationCode = async (data) => {
  console.log('MASUK KE REQUEST ', data)
  return request({
    url: 'auth/verification',
    auth: false,
    data,
    method: 'post'
  })
}

const resendVerificationCode = async (data) => {
  return request({
    url: 'auth/resend/verification',
    auth: false,
    data,
    method: 'post'
  })
}

const apiVerifyPhoneFirebase = async (data, guard = 'user') => {
  return request({
    url: 'auth/verif-phone',
    auth: true,
    data,
    method: 'put',
    guard
  })
}

export {
  verificationCode,
  resendVerificationCode,
  apiVerifyPhoneFirebase,
  apiSendCode
}
