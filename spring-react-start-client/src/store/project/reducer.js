import {handleActions} from 'redux-actions'
import {fromJS} from 'immutable'

import {receiveProjects, receiveProject} from './actions'

const initialState = fromJS({
    projectsList: []
})

export default handleActions({
    [receiveProjects]: (state, {payload}) => {
        return state.merge(payload)
    },
    [receiveProject]: (state, {payload}) => {
        return state.update('projectsList', projectsList => projectsList.push({...payload}))
    },
}, initialState)
