import { handleActions } from 'redux-actions'
import Immutable from 'immutable'

import { setCurrentProject } from './actions'

const initialState = Immutable.Map()

export default handleActions({
    [setCurrentProject]: (state, { payload }) => state.mergeDeep(payload)
}, initialState)
