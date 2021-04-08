import {
  apiEditProfile,
  apiChangeEmail,
  apiChangePassword,
  apiChangePhone
} from 'services/account/accountService'

import {
  uploadImage
} from 'actions/utils/imageUploadAction'

import {
  FAILED_CHANGE_ACCOUNT,
  FETCH_CHANGE_ACCOUNT,
  RECEIVE_CHANGE_ACCOUNT
} from '../types'

import { getUserData } from '../auth/authAction'

const fetch = () => {
  return {
    type: FETCH_CHANGE_ACCOUNT
  }
}

const received = () => {
  return {
    type: RECEIVE_CHANGE_ACCOUNT
  }
}

const failed = (error) => {
  return {
    type: FAILED_CHANGE_ACCOUNT,
    payload: {
      error: typeof error === 'object' ? error.message : error
    }
  }
}

const updateProfile = (data, guard) => async (dispatch) => {
  try {
    dispatch(fetch())
    if (data && data.image && !data.imageRaw) {
      data.image = await dispatch(uploadImage('user', data.image, guard))
    }
    const response = await apiEditProfile(data, guard)
    if (response.success) {
      dispatch(getUserData(guard))
      return response
    }
    dispatch(failed(response))
    return response
  } catch (error) {
    dispatch(failed(error))
  }
}

const changeEmail = (data, guard) => async (dispatch) => {
  try {
    dispatch(fetch())
    const response = await apiChangeEmail(data, guard)
    dispatch(received())
    dispatch(getUserData(guard))
    if (response.success) {
      return response
    }
    dispatch(failed(response))
    return response
  } catch (error) {
    dispatch(failed(error))
  }
}

const changePassword = (data, guard) => async (dispatch) => {
  try {
    dispatch(fetch())
    const response = await apiChangePassword(data, guard)
    // dispatch(getUserData())
    if (response.success) {
      return response
    }
    dispatch(failed(response))
    return response
  } catch (error) {
    dispatch(failed(error))
  }
}

const changePhone = (data, guard) => async (dispatch) => {
  try {
    dispatch(fetch())
    const response = await apiChangePhone(data, guard)
    // dispatch(getUserData())
    if (response.success) {
      return response
    }
    dispatch(failed(response))
    return response
  } catch (error) {
    dispatch(failed(error))
  }
}

export {
  updateProfile,
  changeEmail,
  changePassword,
  changePhone
}
