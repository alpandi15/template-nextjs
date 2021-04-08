import {
  FETCH_AUTH,
  RECEIVE_AUTH,
  FAILED_AUTH,
  FETCH_LOGOUT_USER,
  FAILED_CHANGE_ACCOUNT,
  FETCH_CHANGE_ACCOUNT,
  RECEIVE_CHANGE_ACCOUNT
} from '../../actions/types'

const initialState = {
  loading: false,
  currentItem: {},
  list: [],
  meta: {},
  error: false,
  message: ''
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_AUTH:
      return {
        ...state,
        loading: true,
        error: false
      }
    case RECEIVE_AUTH:
      return {
        ...state,
        loading: false,
        error: false,
        message: '',
        currentItem: action.payload.currentItem
      }
    case FAILED_AUTH:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload.error
      }
    case FETCH_LOGOUT_USER:
      return {
        ...state,
        loading: false,
        error: false,
        currentItem: {}
      }
    case FETCH_CHANGE_ACCOUNT:
      return {
        ...state,
        loading: true,
        error: false
      }
    case RECEIVE_CHANGE_ACCOUNT:
      return {
        ...state,
        loading: false,
        error: false
      }
    case FAILED_CHANGE_ACCOUNT:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload.error
      }
    default:
      return state
  }
}
