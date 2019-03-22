import axios from 'axios'
import {createAction} from 'redux-actions'
import {SubmissionError} from 'redux-form'

import {getProject} from '../../store/project/actions'

export const setCurrentProject = createAction('Receive Current Project')

export const initAddProject = (urlProps) => (dispatch) => {
    urlProps.params.id && dispatch(getProject(urlProps.params.id))
                            .then((project) => dispatch(setCurrentProject({currentProject: project})))
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
