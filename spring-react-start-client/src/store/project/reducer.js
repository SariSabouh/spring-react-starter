import {handleActions} from 'redux-actions'
import {fromJS} from 'immutable'

import {receiveProjects, receiveProject, receiveProjectsTasks} from './actions'

const initialState = fromJS({
    projectsList: []
})

export default handleActions({
    [receiveProjects]: (state, {payload}) => {
        return state.merge(payload)
    },
    [receiveProject]: (state, {payload}) => {
        return state.update('projectsList', projectsList => projectsList.push({...payload}))
    },
    [receiveProjectsTasks]: (state, {payload}) => {
        const projectList = state.get('projectsList')
        let addProject = true
        for (let i = 0; i < projectList.length; i++) {
            const project = projectList[i]
            if (project.projectIdentifier === payload.id) {
                project.tasksList = payload.tasksList
                addProject = false
                break
            }
        }

        if (addProject) {
            return state.update('projectsList', projectsList => projectsList.push({projectIdentifier: payload.id, tasksList: payload.tasksList}))
        }
        return state.set('projectsList', projectList)
    },
}, initialState)
