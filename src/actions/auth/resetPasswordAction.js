import Router from 'next/router'
import { apiResetPassword } from 'services/auth/resetPasswordService'
import {
  FETCH_RESET_PASSWORD,
  SUCCESS_RESET_PASSWORD,
  FAILED_RESET_PASSWORD
} from '../types'

const fetch = () => {
  return {
    type: FETCH_RESET_PASSWORD
  }
}

const success = (data, meta) => {
  return {
    type: SUCCESS_RESET_PASSWORD,
    payload: {
      data,
      meta,
      message: meta.message
    }
  }
}

const failed = (error) => {
  return {
    type: FAILED_RESET_PASSWORD,
    payload: {
      error: typeof error === 'object' ? error.message : error
    }
  }
}

const resetPassword = (value, userType = 'user') => async (dispatch) => {
  try {
    dispatch(fetch())
    const response = await apiResetPassword('email', value)
    if (response.success) {
      dispatch(success(response.data, response.meta))
      if (userType === 'stand') {
        Router.push({
          pathname: '/stand/auth/login'
        })
        return response
      }
      if (userType === 'owner') {
        Router.push({
          pathname: '/owner/auth/login'
        })
        return response
      }
      Router.push({
        pathname: '/auth/login'
      })
      return response
    }
    dispatch(failed(response))
    return response
  } catch (error) {
    dispatch(failed(error))
    return error
  }
}

export {
  resetPassword
}
