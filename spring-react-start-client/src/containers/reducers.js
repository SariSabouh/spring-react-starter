import { combineReducers } from 'redux'

import project from './add-project/reducer'
import projectBoard from './project-board/reducer'
import projectTask from './add-project-task/reducer'

export default combineReducers({
    project,
    projectBoard,
    projectTask
})
