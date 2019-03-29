import axios from 'axios'
import {getProjects} from "../../store/project/actions"

export const initDashboard = () => (dispatch) => {
    return dispatch(getProjects())
}

export const deleteProject = (id) => (dispatch) => {
    if (window.confirm('Are you sure?')) { // TODO: Add modals
        return axios.delete(`/api/project/${id}`)
            .then(() => dispatch(getProjects()))
    }
}
