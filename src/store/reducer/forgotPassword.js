import {
  FETCH_FORGOT_PASSWORD,
  RECEIVE_ITEM_FORGOT_PASSWORD,
  FAILED_FORGOT_PASSWORD
} from '../../actions/types'

const initialState = {
  loading: false,
  currentItem: {},
  meta: {},
  error: false,
  message: ''
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_FORGOT_PASSWORD:
      return {
        ...state,
        loading: true,
        message: null
      }
    case RECEIVE_ITEM_FORGOT_PASSWORD:
      return {
        ...state,
        loading: false,
        currentItem: action.payload.currentItem,
        meta: action.payload.meta,
        message: null
      }
    case FAILED_FORGOT_PASSWORD:
      return {
        ...state,
        loading: false,
        message: action.payload.error
      }
    default:
      return state
  }
}
