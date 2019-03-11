import axios from 'axios'
import {createAction} from 'redux-actions'

export const receiveErrors = createAction('Receive API Errors')

export const createProject = (project, history) => (dispatch) => {
    axios.post('http://localhost:8080/api/project', project)
        .then(() => history.push('/dashboard'))
        .catch((err) => {
            dispatch(receiveErrors({projectErrors: {...err.response.data}}))
        })
}
