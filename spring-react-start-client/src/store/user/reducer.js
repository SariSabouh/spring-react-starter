import {handleActions} from 'redux-actions'
import Immutable from 'immutable'

import {receiveUserData, setLoggedIn} from './actions'

const initialState = Immutable.Map()

export default handleActions({
    [receiveUserData]: (state, {payload}) => {
        return state.merge(payload)
    },
    [setLoggedIn]: (state, {payload}) => {
        return state.merge(payload)
    }
}, initialState)
