import axios from 'axios'
import { createAction } from 'redux-actions'
import { SubmissionError } from 'redux-form'

import { isUserLoggedIn } from '../../store/user/selectors'

import { getProjectTask } from '../../store/project/actions'

export const setCurrentTask = createAction('Receive Current Task')

export const initAddProjectTask = (routeProps) => (dispatch, getStore) => {
    const { match, history } = routeProps
    if (!isUserLoggedIn(getStore())) {
        history.push('/login')
    } else {
        const { id, sequence } = match.params
        id && sequence &&
            dispatch(getProjectTask(id, sequence))
                .then((task) => dispatch(setCurrentTask({ currentTask: task })))
                .catch(() => history.push('/dashboard'))
    }
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
    if (formValues.isUpdate) {
        return axios.patch(`/api/backlog/${backlogId}/${formValues.projectSequence}`, formValues)
            .then(() => history.push(`/projectBoard/${backlogId}`))
            .catch((err) => Promise.reject(new SubmissionError({ ...err.response.data })))
    }
    return axios.post(`/api/backlog/${backlogId}`, formValues)
        .then(() => history.push(`/projectBoard/${backlogId}`))
        .catch((err) => Promise.reject(new SubmissionError({ ...err.response.data })))
}
