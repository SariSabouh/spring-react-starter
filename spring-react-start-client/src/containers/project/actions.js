import axios from 'axios'
import {receiveErrors} from '../../store/errors/actions'

export const createProject = (project, history) => (dispatch) => {
    axios.post('http://localhost:8080/api/project', project)
        .then(() => history.push('/dashboard'))
        .catch((err) => {
            dispatch(receiveErrors({...err.response.data}))
        })
}
