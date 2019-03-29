import axios from 'axios'
import {createAction} from 'redux-actions'

import {getProjectTasksById} from '../../store/project/actions'

export const setCurrentTaskList = createAction('Receive Current Task List')

export const initProjectBoard = (routeProps) => (dispatch) => {
    const {match, history} = routeProps
    match.params.id &&
        dispatch(getProjectTasksById(match.params.id))
            .then(({payload}) => dispatch(setCurrentTaskList(payload)))
            .catch((e) => {
                history.push('/dashboard')
            })
    return Promise.resolve()
}

export const deleteProject = (id) => (dispatch) => {
    // if (window.confirm('Are you sure?')) { // TODO: Add modals
    //     return axios.delete(`/api/project/${id}`)
    //         .then(() => dispatch(getProjects()))
    // }
}
