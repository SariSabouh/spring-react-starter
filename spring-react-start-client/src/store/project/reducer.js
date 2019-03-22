import {handleActions} from 'redux-actions'
import Immutable from 'immutable'

import {receiveProject} from './actions'

const initialState = Immutable.Map()

export default handleActions({
    [receiveProject]: (state, {payload}) => {
        return state.mergeDeep(payload)
    }
}, initialState)
