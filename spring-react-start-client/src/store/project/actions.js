import axios from 'axios'
import {createAction} from 'redux-actions'

import {getProjectsList} from './selectors'

export const receiveProjects = createAction('Receive Projects List')
export const receiveProject = createAction('Receive Project Data')
export const receiveProjectsTasks = createAction('Receive Projects Tasks List')

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

export const getProjectTasksById = (id) => (dispatch, getStore) => {
    return axios.get(`/api/backlog/${id}`)
        .then((response) => dispatch(receiveProjectsTasks({tasksList: response.data, id})))
}
