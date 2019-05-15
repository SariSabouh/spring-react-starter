import { handleActions } from 'redux-actions'
import { fromJS } from 'immutable'

import { setCurrentTaskList, receiveErrorMessage } from './actions'

const initialState = fromJS({
    tasksList: []
})

export default handleActions({
    [setCurrentTaskList]: (state, { payload }) => state.merge({ tasksList: payload.tasksList }),
    [receiveErrorMessage]: (state, { payload }) => state.merge(payload),
}, initialState)
