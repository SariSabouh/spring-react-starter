import axios from 'axios'
import { getProjects } from 'store/project/actions'

import { isUserLoggedIn } from 'store/user/selectors'

export const initDashboard = ({ history }) => (dispatch, getStore) => {
    if (!isUserLoggedIn(getStore())) {
        history.push('/login')
        return Promise.resolve()
    }
    return dispatch(getProjects()) // TODO: Think about keeping 401 or kick them out before
}

export const deleteProject = (id) => (dispatch) => {
    if (window.confirm('Are you sure?')) { // TODO: Add modals
        return axios.delete(`/api/project/${id}`)
            .then(() => dispatch(getProjects()))
    }
    return false
}
