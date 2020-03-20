import { createSelector } from 'reselect'
import { createGetSelector } from 'reselect-immutable-helpers'

import { getUi } from 'store/selectors'

export const getProjectTask = createSelector(getUi, ({ projectTask }) => projectTask)
export const getCurrentProject = createGetSelector(getProjectTask, 'currentProject')
export const getCurrentTask = createGetSelector(getProjectTask, 'currentTask')
