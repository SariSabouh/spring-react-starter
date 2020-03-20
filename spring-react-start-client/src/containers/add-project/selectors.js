import { createSelector } from 'reselect'
import { createGetSelector } from 'reselect-immutable-helpers'

import { getUi } from 'store/selectors'

export const getProject = createSelector(getUi, ({ project }) => project)
export const getCurrentProject = createGetSelector(getProject, 'currentProject')
