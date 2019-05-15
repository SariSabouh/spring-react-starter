import axios from 'axios'
import jwt_decode from 'jwt-decode' // eslint-disable-line camelcase

import { setLoggedIn, receiveUserData } from '../store/user/actions'

const AUTH_KEY_NAME = 'sec-auth'

const getItemFromBrowserStorage = (keyName) => window.sessionStorage.getItem(keyName)

const setItemInBrowserStorage = (keyName, value) => {
    window.sessionStorage.setItem(keyName, value)
}

const removeItemFromBrowserStorage = (keyName) => {
    window.sessionStorage.removeItem(keyName)
}

export const setJWTToken = (token) => (dispatch) => {
    if (token) {
        setItemInBrowserStorage(AUTH_KEY_NAME, token)
        axios.defaults.headers.common.Authorization = token

        const decodedToken = jwt_decode(token)
        dispatch(receiveUserData({ fullName: decodedToken.fullName, username: decodedToken.username }))
        dispatch(setLoggedIn({ authenticated: true }))
    } else {
        removeItemFromBrowserStorage(AUTH_KEY_NAME)
        dispatch(setLoggedIn({ authenticated: false }))
        delete axios.defaults.headers.common.Authorization
    }
}

const isTokenExpired = (authorizationToken) => {
    const { exp } = jwt_decode(authorizationToken)

    const now = Date.now() / 1000
    return exp < now
}

export const initSession = () => (dispatch) => {
    const auth = getItemFromBrowserStorage(AUTH_KEY_NAME)
    if ((!auth || isTokenExpired(auth)) && axios.defaults.headers.common.Authorization) {
        dispatch(setJWTToken())
    } else if (auth && axios.defaults.headers.common.Authorization !== auth) {
        dispatch(setJWTToken(auth))
    }
    return Promise.resolve()
}
