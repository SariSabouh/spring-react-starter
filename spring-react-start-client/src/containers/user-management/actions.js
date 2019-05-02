import isEmail from 'validator/lib/isEmail'
import axios from 'axios'
import {SubmissionError} from 'redux-form'

import { setJWTToken } from '../../utils/request-utils'
import {isUserLoggedIn} from '../../store/user/selectors'

const validateForm = (formValues, isRegister) => {
    const errors = {}
    if (!formValues) {
        return {
            _error: 'Please fill form'
        }
    }

    const {
        username,
        password,
        confirmPassword,
        fullName
    } = formValues

    if (!username) {
        errors.username = 'Email address is required'
    } else if (!isEmail(username)) {
        errors.username = 'Email address is invalid'
    }

    if (!password) {
        errors.password = 'Password is required'
    } else if (password.length < 7) {
        errors.password = "Password needs to be at least 6 characters"
    }

    if (isRegister && !confirmPassword) {
        errors.confirmPassword = 'Confirm password is required'
    } else if (isRegister && confirmPassword !== password) {
        errors.confirmPassword = 'Passwords must match'
    }

    if (isRegister && !fullName) {
        errors.fullName = 'Name is required'
    }

    return errors
}

const checkLoginStatus = (history) => (dispatch, getStore) => {
    if (isUserLoggedIn(getStore())) {
        history.push('/dashboard')
        return Promise.resolve()
    }
}

export const initLogin = ({history}) => (dispatch) => {
    dispatch(checkLoginStatus(history))
    return Promise.resolve()
}

export const initRegister = ({history}) => (dispatch) => {
    dispatch(checkLoginStatus(history))
    return Promise.resolve()
}

export const registerUser = (formValues, history) => (dispatch) => {
    const errors = validateForm(formValues, true)
    if (errors._error || Object.keys(errors).length) {
        return Promise.reject(new SubmissionError(errors))
    }

    return axios.post('/api/users/register', formValues)
        .then(() => history.push('/login'))
        .catch((err) => {
            return Promise.reject(new SubmissionError({...err.response.data}))
        })
}

export const login = (formValues, history) => (dispatch) => {
    const errors = validateForm(formValues)
    if (errors._error || Object.keys(errors).length) {
        return Promise.reject(new SubmissionError(errors))
    }

    return axios.post('/api/users/login', formValues)
        .then(({data}) => {
            dispatch(setJWTToken(data.token))
            history.push('/dashboard')
        })
        .catch((err) => {
            return Promise.reject(new SubmissionError({...err.response.data}))
        })
}

export const logout = () => (dispatch) => {
    dispatch(setJWTToken())
}
