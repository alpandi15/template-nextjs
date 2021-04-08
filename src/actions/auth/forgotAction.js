import {
  apiForgotPassword
} from 'services/auth/forgotService'
import { set } from 'services/utils/storage'
import {
  FORGOT_BY_EMAIL
  // FORGOT_BY_PHONE
} from 'constants'

import {
  FETCH_FORGOT_PASSWORD,
  RECEIVE_ITEM_FORGOT_PASSWORD,
  FAILED_FORGOT_PASSWORD
} from '../types'

const fetch = () => {
  return {
    type: FETCH_FORGOT_PASSWORD
  }
}

const receiveItem = (currentItem, meta) => {
  return {
    type: RECEIVE_ITEM_FORGOT_PASSWORD,
    payload: {
      currentItem,
      meta
    }
  }
}

const failed = (error) => {
  return {
    type: FAILED_FORGOT_PASSWORD,
    payload: {
      error: typeof error === 'object' ? error.message : error
    }
  }
}

const forgotPassword = (value, guard = 'user') => async (dispatch) => {
  try {
    dispatch(fetch())
    const response = await apiForgotPassword('email', value)
    if (response && response.success) {
      dispatch(receiveItem(response, response.meta))
      set(`${FORGOT_BY_EMAIL}_${guard}`, response.data.expired)
      return response
    }
    dispatch(failed(response))
    return response
  } catch (error) {
    dispatch(failed(error))
  }
}

export {
  forgotPassword
}
