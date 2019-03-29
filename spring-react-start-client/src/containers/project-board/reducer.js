import {handleActions} from 'redux-actions'
import Immutable from 'immutable'

import {setCurrentTaskList, receiveErrorMessage} from './actions'

const initialState = Immutable.Map()

export default handleActions({
    [setCurrentTaskList]: (state, {payload}) => state.merge({tasksList: payload.tasksList}),
    [receiveErrorMessage]: (state, {payload}) => state.merge(payload),
}, initialState)
