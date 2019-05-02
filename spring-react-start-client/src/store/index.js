import {createStore, applyMiddleware, compose, combineReducers} from 'redux'
import Immutable from 'immutable'
import thunk from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'

import rootReducer from '../containers/reducers'
import projectReducer from './project/reducer'
import userReducer from './user/reducer'

const reducers = combineReducers({
    ui: rootReducer,
    project: projectReducer,
    form: formReducer,
    user: userReducer
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
