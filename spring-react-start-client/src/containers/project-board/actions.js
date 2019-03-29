import axios from 'axios'
import {createAction} from 'redux-actions'

import {getProjectTasksById} from '../../store/project/actions'

export const setCurrentTaskList = createAction('Receive Current Task List')

const updateProductTasks = (id) => (dispatch) => {
    return dispatch(getProjectTasksById(id))
        .then(({payload}) => dispatch(setCurrentTaskList(payload)))
}

export const initProjectBoard = (routeProps) => (dispatch) => {
    const {match, history} = routeProps
    match.params.id && dispatch(updateProductTasks(match.params.id))
    .catch((e) => {
        history.push('/dashboard')
    })
    return Promise.resolve()
}

export const deleteProject = (backlogId, projectTaskId) => (dispatch) => {
    if (window.confirm('Are you sure?')) { // TODO: Add modals
        return axios.delete(`/api/backlog/${backlogId}/${projectTaskId}`)
            .then(() => dispatch(updateProductTasks(backlogId)))
    }
}
