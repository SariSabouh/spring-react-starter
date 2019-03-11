import {handleActions} from 'redux-actions'
import Immutable from 'immutable'

import {receiveErrors} from './actions'

const initialState = Immutable.Map()

export default handleActions({
    [receiveErrors]: (state, {payload}) => {
        return state.mergeDeep(payload)
    }
}, initialState)
