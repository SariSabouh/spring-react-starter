import axios from 'axios'
import {createAction} from 'redux-actions'

import {getProjectTasksById} from '../../store/project/actions'

export const setCurrentTaskList = createAction('Receive Current Task List')
export const receiveErrorMessage = createAction('Receive Error Message')

const updateProductTasks = (id) => (dispatch) => {
    dispatch(receiveErrorMessage({projectNotFound: undefined}))
    return dispatch(getProjectTasksById(id))
        .then(({payload}) => dispatch(setCurrentTaskList(payload)))
}

export const initProjectBoard = (routeProps) => (dispatch) => {
    const {match} = routeProps
    match.params.id && dispatch(updateProductTasks(match.params.id))
    .catch((err) => {
        dispatch(receiveErrorMessage(err.response.data))
    })
    return Promise.resolve()
}

export const deleteProject = (backlogId, projectTaskId) => (dispatch) => {
    if (window.confirm('Are you sure?')) { // TODO: Add modals
        return axios.delete(`/api/backlog/${backlogId}/${projectTaskId}`)
            .then(() => dispatch(updateProductTasks(backlogId)))
    }
}
