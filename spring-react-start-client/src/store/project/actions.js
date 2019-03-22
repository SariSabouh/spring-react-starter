import axios from 'axios'
import {createAction} from 'redux-actions'

import {getProjectsList} from './selectors'

export const receiveProjects = createAction('Receive Projects List')
export const receiveProject = createAction('Receive Project Data')

export const getProjects = () => (dispatch) => {
    axios.get('/api/project/all')
        .then((response) => dispatch(receiveProjects({projectsList: response.data})))
}

export const getProject = (id) => (dispatch, getStore) => {
    const projects = getProjectsList(getStore())
    const project = projects.find((project) => project.projectIdentifier === id)
    if (project) {
        return new Promise((resolve) => resolve(project))
    } else {
        return axios.get(`/api/project/${id}`)
            .then((response) => {
                dispatch(receiveProject(response.data))
                return response.data
            })
    }
}
