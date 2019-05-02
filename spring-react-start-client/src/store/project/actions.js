import axios from 'axios'
import {createAction} from 'redux-actions'

import {getProjectsList} from './selectors'
import {getCurrentTaskList} from '../../containers/project-board/selectors'

export const receiveProjects = createAction('Receive Projects List')
export const receiveProject = createAction('Receive Project Data')
export const receiveProjectsTasks = createAction('Receive Projects Tasks List')
export const receiveProjectTask = createAction('Receive Project Task')

export const getProjects = () => (dispatch) => {
    axios.get('/api/project/all')
        .then((response) => dispatch(receiveProjects({projectsList: response.data})))
        .catch((e) => e.response.status === 401 && console.error('Please log in'))
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

export const getProjectTask = (id, sequence) => (dispatch, getStore) => {
    const tasksList = getCurrentTaskList(getStore())
    const task = tasksList.find((task) => task.projectIdentifier === id)
    if (task) {
        return new Promise((resolve) => resolve(task))
    } else {
        return dispatch(getProjectTasksById(id))
            .then((response) => {
                const updatedTasksList = response.payload.tasksList
                const updatedTask = updatedTasksList.find((task) => task.projectIdentifier === id)
                return updatedTask
            })
    }
}
