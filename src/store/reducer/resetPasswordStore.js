import {
  FETCH_RESET_PASSWORD,
  SUCCESS_RESET_PASSWORD,
  FAILED_RESET_PASSWORD
} from '../../actions/types'

const initialState = {
  loading: false,
  data: {},
  meta: {},
  error: false,
  message: null
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_RESET_PASSWORD:
      return Object.assign({}, state, {
        loading: true,
        data: {},
        meta: {},
        error: false,
        message: null
      })
    case SUCCESS_RESET_PASSWORD:
      return Object.assign({}, state, {
        loading: false,
        data: action.payload.data,
        meta: action.payload.meta,
        error: false,
        message: action.payload.message
      })
    case FAILED_RESET_PASSWORD:
      return Object.assign({}, state, {
        loading: false,
        data: {},
        meta: {},
        error: true,
        message: action.payload.error
      })
    default:
      return state
  }
}
