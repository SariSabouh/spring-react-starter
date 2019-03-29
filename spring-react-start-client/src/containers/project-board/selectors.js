import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'

import {getUi} from '../../store/selectors'

export const getProjectBoard = createSelector(getUi, ({projectBoard}) => projectBoard)
export const getCurrentTaskList = createGetSelector(getProjectBoard, 'tasksList')
export const getProjectNotFoundError = createGetSelector(getProjectBoard, 'projectNotFound')
