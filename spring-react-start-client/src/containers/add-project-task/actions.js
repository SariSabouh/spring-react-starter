import axios from 'axios'
import {createAction} from 'redux-actions'
import {SubmissionError} from 'redux-form'

export const setCurrentProject = createAction('Receive Current Project')

export const initAddProjectTask = (routeProps) => (dispatch) => {
    const {match, history} = routeProps
    // match.params.id &&
    //     dispatch(getProject(match.params.id))
    //         .then((project) => dispatch(setCurrentProject({currentProject: project})))
    //         .catch((e) => history.push('/dashboard'))
    return Promise.resolve()
}

const validateProjectTaskForm = (formValues) => {
    const errors = {}

    if (!Object.keys(formValues).length) {
        return {
            _error: 'Please fill form'
        }
    }

    if (!formValues.summary) {
        errors.summary = 'Summary can\'t be empty'
    }

    return errors
}

export const addProjectTask = (formValues, backlogId, history) => (dispatch) => {
    const errors = validateProjectTaskForm(formValues)
    if (errors._error || Object.keys(errors).length) {
        return Promise.reject(new SubmissionError(errors))
    }
    return axios.post(`/api/backlog/${backlogId}`, formValues)
        .then(() => history.push(`/projectBoard/${backlogId}`))
        .catch((err) => {
            return Promise.reject(new SubmissionError({...err.response.data}))
        })
}
