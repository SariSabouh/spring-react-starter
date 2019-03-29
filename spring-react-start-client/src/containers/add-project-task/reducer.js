import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import { setCurrentTask } from './actions';

const initialState = Immutable.Map()

export default handleActions({
    [setCurrentTask]: (state, {payload}) => {
        return state.mergeDeep(payload)
    }
}, initialState)
