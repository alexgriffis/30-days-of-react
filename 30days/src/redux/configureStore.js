import { createStore, bindActionCreators } from 'redux'
import * as currentTime from './modules/currentTime'

const configureStore = () => {
  const store = createStore(currentTime.reducer)
  const actions = {
    currentTime: bindActionCreators(
      currentTime.actions,
      store.dispatch
    )
  }

  return { store, actions }
}

export default configureStore
