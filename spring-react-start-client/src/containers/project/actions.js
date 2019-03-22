import axios from 'axios'
import {createAction} from 'redux-actions'
import {SubmissionError} from 'redux-form'

import {getProject, getProjects} from '../../store/project/actions'

export const setCurrentProject = createAction('Receive Current Project')

export const initAddProject = (routeProps) => (dispatch) => {
    const {match, history} = routeProps
    match.params.id &&
        dispatch(getProject(match.params.id))
            .then((project) => dispatch(setCurrentProject({currentProject: project})))
            .catch((e) => history.push('/dashboard'))
    return Promise.resolve()
}

export const createProject = (formValues, history) => (dispatch) => {
    if (!Object.keys(formValues).length) {
        return Promise.reject(new SubmissionError({_error: 'Please fill form'}))
    }
    return axios.post('http://localhost:8080/api/project', formValues)
        .then(() => history.push('/dashboard'))
        .catch((err) => {
            return Promise.reject(new SubmissionError({...err.response.data}))
        })
}

export const deleteProject = (id) => (dispatch) => {
    return axios.delete(`http://localhost:8080/api/project/${id}`)
        .then(() => dispatch(getProjects()))
}
