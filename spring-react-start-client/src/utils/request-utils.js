import axios from "axios"
import jwt_decode from 'jwt-decode'
import { setLoggedIn } from "../store/user/actions";

const AUTH_KEY_NAME = 'sec-auth'

const getItemFromBrowserStorage = (keyName) => {
    return window.sessionStorage.getItem(keyName)
}

const setItemInBrowserStorage = (keyName, value) => {
    window.sessionStorage.setItem(keyName, value)
}

const removeItemFromBrowserStorage = (keyName) => {
    window.sessionStorage.removeItem(keyName)
}

export const setJWTToken = (token) => (dispatch) => {
    if (token) {
        setItemInBrowserStorage(AUTH_KEY_NAME, token)
        dispatch(setLoggedIn({authenticated: true}))
        axios.defaults.headers.common['Authorization'] = token
    } else {
        removeItemFromBrowserStorage(AUTH_KEY_NAME)
        dispatch(setLoggedIn({authenticated: false}))
        delete axios.defaults.headers.common['Authorization']
    }
}

const isTokenExpired = (authorizationToken) => {
    const {exp} = jwt_decode(authorizationToken)

    const now = Date.now() / 1000
    return exp < now
}

export const initSession = () => (dispatch) => {
    const auth = getItemFromBrowserStorage(AUTH_KEY_NAME)
    if (!auth || isTokenExpired(auth)) {
        dispatch(setJWTToken())
    } else {
        dispatch(setJWTToken(auth))
    }
    return Promise.resolve()
}
