import {createStore, applyMiddleware, compose} from 'redux'
import Immutable from 'immutable'
import thunk from 'redux-thunk'
import rootReducer from '../containers/reducers'

const initialState = {}
const middleware = [thunk]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        serialize: {
            immutable: Immutable
        }
    }) : compose

const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
)

export default store
