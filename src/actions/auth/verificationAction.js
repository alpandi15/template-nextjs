import Router from 'next/router'
import { verificationCode, apiVerifyPhoneFirebase, apiSendCode } from 'services/auth/verificationService'
import { TYPE_ACCOUNT_EMAIL, OTP_EMAIL } from 'constants'
import { toastify } from 'components/Toast/Toastify'
import { set, get, remove } from 'services/utils/storage'
import {
  FETCH_VERIFICATION,
  SUCCESS_VERIFICATION,
  FAILED_VERIFICATION
} from '../types'

const fetch = () => {
  return {
    type: FETCH_VERIFICATION
  }
}

const success = (data, meta) => {
  return {
    type: SUCCESS_VERIFICATION,
    payload: {
      data,
      meta
    },
    message: data.message
  }
}

const failed = (error) => {
  return {
    type: FAILED_VERIFICATION,
    payload: {
      error: typeof error === 'object' ? error.message : error
    }
  }
}

const sendCode = type => async (dispatch) => {
  try {
    dispatch(fetch(type))
    const response = await apiSendCode(type)
    if (response.success) {
      dispatch(success(response.data, response.meta))
      if (type === 'email') {
        await set(OTP_EMAIL, JSON.stringify(response.data))
      }
      toastify({
        type: 'success',
        message: response.meta.message,
        duration: 4000
      })
      return response
    }
    dispatch(failed(response))
    toastify({
      type: 'error',
      message: response.message || response.detail
    })
    return response
  } catch (error) {
    toastify({
      type: 'error',
      message: error
    })
    dispatch(failed(error, type))
  }
}

const getExpiredCode = name => async (dispatch) => {
  let response = ''
  if (name === 'email') {
    response = await get(OTP_EMAIL)
  }

  if (response) {
    dispatch(success(JSON.parse(response), {
      message: 'Success'
    }))
    return JSON.parse(response)
  }
  dispatch(failed({
    message: 'Please Resend Code'
  }, name))
  return response
}

const removeExpiredCode = name => async (dispatch) => {
  let response = ''
  if (name === 'email') {
    response = await remove(OTP_EMAIL)
  }

  if (response) {
    dispatch(success({}, {
      message: 'Success'
    }))
    return true
  }
  dispatch(failed({
    message: 'Expired Token Removed'
  }, name))
  return false
}

const verification = (value, guard = 'user') => async (dispatch) => {
  try {
    dispatch(fetch())
    value.typeAccount = TYPE_ACCOUNT_EMAIL
    const response = await verificationCode(value)
    console.log('Response Ini ', response)
    if (response.success) {
      dispatch(success(response.data, response.meta))
      toastify({
        type: 'success',
        message: response.meta.message
      })
      // untuk verifikasi kode forgot password
      if (value && value.account && value.typeCode === 0) {
        if (guard === 'stand') {
          Router.push({
            pathname: '/stand/auth/reset-password',
            query: { email: value.account }
          })
          return
        }
        if (guard === 'owner') {
          Router.push({
            pathname: '/owner/auth/reset-password',
            query: { email: value.account }
          })
          return
        }
        Router.push({
          pathname: '/auth/reset-password',
          query: { email: value.account }
        })
        return
      }
      return response
    }
    dispatch(failed(response))
    toastify({
      type: 'error',
      message: response.message || response.detail
    })
    return response
  } catch (error) {
    dispatch(failed(error))
    toastify({
      type: 'error',
      message: JSON.stringify(error)
    })
  }
}

const verificationPhone = (value, guard = 'user') => async (dispatch) => {
  try {
    dispatch(fetch())
    const response = await apiVerifyPhoneFirebase(value, guard)
    console.log('Response Ini ', response)
    if (response.success) {
      toastify({
        type: 'success',
        message: response.meta.message || response.detail
      })

      dispatch(success(response.data, response.meta))

      Router.back()
      // window.location.reload()
    } else {
      toastify({
        type: 'error',
        message: response.message || response.detail || response.statusCode
      })
      dispatch(failed(response))
    }
  } catch (error) {
    dispatch(failed(error))
  }
}

export {
  verification,
  verificationPhone,
  sendCode,
  getExpiredCode,
  removeExpiredCode
}
