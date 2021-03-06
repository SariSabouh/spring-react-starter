import axios from 'axios'
import { createAction } from 'redux-actions'

import { isUserLoggedIn } from 'store/user/selectors'

import { getProjectTasksById } from 'store/project/actions'

export const setCurrentTaskList = createAction('Receive Current Task List')
export const receiveErrorMessage = createAction('Receive Error Message')

export const updateProductTasks = (id) => (dispatch) => {
    dispatch(receiveErrorMessage({ projectNotFound: undefined }))
    return dispatch(getProjectTasksById(id))
        .then(({ payload }) => dispatch(setCurrentTaskList(payload)))
}

export const initProjectBoard = (routeProps) => (dispatch, getStore) => {
    const { match, history } = routeProps
    if (!isUserLoggedIn(getStore())) {
        history.push('/login')
    } else {
        match.params.id && dispatch(updateProductTasks(match.params.id))
            .catch((err) => {
                dispatch(receiveErrorMessage({ ...err.response.data }))
            })
    }
    return Promise.resolve()
}

export const deleteProject = (backlogId, projectTaskId) => (dispatch) => {
    if (window.confirm('Are you sure?')) { // TODO: Add modals
        return axios.delete(`/api/backlog/${backlogId}/${projectTaskId}`)
            .then(() => dispatch(updateProductTasks(backlogId)))
    }
    return false
}
