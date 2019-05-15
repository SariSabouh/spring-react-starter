import { createGetSelector } from 'reselect-immutable-helpers'

import { getProjects } from '../selectors'

export const getProjectsList = createGetSelector(getProjects, 'projectsList') // eslint-disable-line import/prefer-default-export
// There will be other exports usually
