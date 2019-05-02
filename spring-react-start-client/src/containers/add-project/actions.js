import axios from 'axios'
import {createAction} from 'redux-actions'
import {SubmissionError} from 'redux-form'

import {isUserLoggedIn} from '../../store/user/selectors'

import {getProject} from '../../store/project/actions'

export const setCurrentProject = createAction('Receive Current Project')

export const initAddProject = (routeProps) => (dispatch, getStore) => {
    const {match, history} = routeProps
    if (!isUserLoggedIn(getStore())) {
        history.push('/login')
    } else {
        match.params.id &&
            dispatch(getProject(match.params.id))
                .then((project) => dispatch(setCurrentProject({currentProject: project})))
                .catch((e) => history.push('/dashboard'))
    }
    return Promise.resolve()
}

export const createProject = (formValues, history) => (dispatch) => {
    if (!Object.keys(formValues).length) {
        return Promise.reject(new SubmissionError({_error: 'Please fill form'}))
    }
    return axios.post('/api/project', formValues)
        .then(() => history.push('/dashboard'))
        .catch((err) => {
            return Promise.reject(new SubmissionError({...err.response.data}))
        })
}
