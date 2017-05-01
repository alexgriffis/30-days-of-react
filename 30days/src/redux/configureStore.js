import { createStore, bindActionCreators, combineReducers } from 'redux'
import * as currentTime from './modules/currentTime'
import * as currentUser from './modules/currentUser'

const configureStore = () => {
  const reducer = combineReducers({
    currentTime: currentTime.reducer,
    currentUser: currentUser.reducer
  })

  const store = createStore(reducer)

  const actions = {
    currentTime: bindActionCreators(
      currentTime.actions,
      store.dispatch
    ),
    currentUser: bindActionCreators(
      currentUser.actions,
      store.dispatch
    )
  }

  return { store, actions }
}

export default configureStore
