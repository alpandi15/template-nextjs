import cookie from 'js-cookie'
import { remove, getAccessToken } from 'services/utils/storage'
import { loggedin } from 'components/Security/auth'
import { removeUsedVoucher } from 'services/useVoucher/useVoucherService'
import { removeCart } from 'services/cart/cartService'
import { removeOrderStorage } from 'services/order/manualService'
import {
  apiRegister,
  apiLogin,
  apiGetProfile,
  apiGetTokenGuest
} from '../../services/auth/registerService'
import {
  FETCH_AUTH,
  RECEIVE_AUTH,
  FAILED_AUTH,
  FETCH_LOGOUT_USER
} from '../types'
import { FOODCOURT_SELECTED } from '../../constants'
import firebase from '../../services/utils/firebase'

const fetch = () => {
  return { type: FETCH_AUTH }
}

const receive = (data, path, guard) => {
  loggedin({ ...data, path, guard })
  return {
    type: RECEIVE_AUTH,
    payload: {
      currentItem: data
    }
  }
}

const receivedAuthMe = (data) => {
  return {
    type: RECEIVE_AUTH,
    payload: {
      currentItem: data
    }
  }
}

const logout = () => {
  return { type: FETCH_LOGOUT_USER }
}

const failed = (error) => {
  return {
    type: FAILED_AUTH,
    payload: {
      error: typeof error === 'object' ? error.message : error
    }
  }
}

// Register User
const registerUser = data => async (dispatch) => {
  try {
    dispatch(fetch())
    const response = await apiRegister(data)
    if (response && response.success) {
      dispatch(receive(response.data))
      if (response && response.data) {
        return response
      }
    } else {
      dispatch(failed(response))
      return response
    }
  } catch (error) {
    dispatch(failed(error))
    return error
  }
}

// Login
const loginUser = (data, guard = 'user', path) => async (dispatch) => {
  try {
    dispatch(fetch())
    const response = await apiLogin(data)
    if (response && response.success) {
      dispatch(receive(response.data, path, guard))
      if (response && response.data) {
        await removeCart()
        await removeOrderStorage()
        return response
      }
    } else {
      dispatch(failed(response))
      return response
    }
  } catch (error) {
    dispatch(failed(error))
    return error
  }
}

// Login
const loginGuest = (data, guard = 'user', path) => async (dispatch) => {
  try {
    dispatch(fetch())
    const userToken = await getAccessToken(guard)
    if (userToken) {
      const response = await apiGetProfile(guard)
      if (response.success) {
        dispatch(receivedAuthMe(response.data))
        await removeCart()
        await removeOrderStorage()
        return response
      }
      dispatch(failed(response))
      return response
    }
    const response = await apiGetTokenGuest()
    if (response && response.success) {
      dispatch(receive(response.data, path, guard))
      if (response && response.data) {
        return response
      }
    } else {
      dispatch(failed(response))
      return response
    }
  } catch (error) {
    dispatch(failed(error))
    return error
  }
}

// Logout
const logoutUser = guard => async (dispatch) => {
  await remove(`access_token_${guard}`)
  cookie.remove(`access_token_${guard}`)
  await remove(`refresh_token_${guard}`)
  await removeUsedVoucher()
  await removeCart()
  await removeOrderStorage()
  firebase.auth().signOut().then(e => console.log('FIREBASE SIGN OUT ', e))
  if (guard === 'owner') {
    await remove(FOODCOURT_SELECTED)
  }
  dispatch(logout())
}

// Get user token
const getUserData = (guard, sessionTable) => async (dispatch) => {
  console.log('USER TOKEN ', guard)
  const response = await apiGetProfile(guard, sessionTable)
  if (response.success) {
    dispatch(receivedAuthMe(response.data))
    return response
  }
  // await remove(`access_token_${guard}`)
  // await remove(`refresh_token_${guard}`)
  dispatch(failed(response))
  return response
}

export {
  registerUser,
  loginUser,
  logoutUser,
  getUserData,
  loginGuest
}
