import {createStore, applyMiddleware, compose, combineReducers} from 'redux'
import Immutable from 'immutable'
import thunk from 'redux-thunk'
import rootReducer from '../containers/reducers'

const reducers = combineReducers({
    ui: rootReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
          ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
              serialize: {
                  immutable: Immutable
              }
          })
          : compose
const createStoreWithMiddleware = composeEnhancers(applyMiddleware(thunk))(createStore)
const store = createStoreWithMiddleware(reducers)

export default store
