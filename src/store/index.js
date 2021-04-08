/* eslint-disable comma-dangle */
import {
  combineReducers,
  applyMiddleware,
  createStore
  // compose
} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'

import accountStore from './reducer/accountStore'
import forgotStore from './reducer/forgotPassword'
import userStore from './reducer/userStore'
import resetPasswordStore from './reducer/resetPasswordStore'

// GENERATED REDUCER

const reducers = combineReducers({
  form: formReducer,
  accountStore,
  forgotStore,
  resetPasswordStore,
  userStore,

  // GENERATED COMBINE
})

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware)
  )
)

export default store
