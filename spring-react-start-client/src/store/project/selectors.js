import {createGetSelector} from 'reselect-immutable-helpers'

import {getProjects} from '../../store/selectors'

export const getProjectsList = createGetSelector(getProjects, 'projectsList')
