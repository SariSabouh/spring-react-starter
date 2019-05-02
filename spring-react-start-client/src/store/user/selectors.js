import {createGetSelector} from 'reselect-immutable-helpers'

import {getUser} from '../../store/selectors'

export const isUserLoggedIn = createGetSelector(getUser, 'authenticated')
