import {createSelector} from 'reselect'

import {getUi} from '../../store/selectors'

export const getProject = createSelector(getUi, ({project}) => project)
