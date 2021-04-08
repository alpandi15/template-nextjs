import {
  FETCH_USER,
  RECEIVE_ITEM_USER,
  RECEIVE_USER,
  FAILED_USER
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
    case FETCH_USER:
      return {
        ...state,
        loading: true,
        error: false
      }
    case RECEIVE_ITEM_USER:
      return {
        ...state,
        loading: false,
        error: false,
        message: '',
        currentItem: action.payload.currentItem
      }
    case RECEIVE_USER:
      return {
        ...state,
        loading: false,
        error: false,
        message: '',
        list: action.payload.list,
        meta: action.payload.meta
      }
    case FAILED_USER:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload.error
      }
    default:
      return state
  }
}
