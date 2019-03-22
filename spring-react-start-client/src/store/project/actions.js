import axios from 'axios'
import {createAction} from 'redux-actions'

export const receiveProject = createAction('Receive Project Data')

export const getProjects = () => (dispatch) => {
    axios.get('http://localhost:8080/api/project/all')
        .then((response) => dispatch(receiveProject({projectsData: response.data})))
}
