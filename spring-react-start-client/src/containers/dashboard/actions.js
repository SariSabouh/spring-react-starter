import { getProjects } from "../../store/project/actions";

export const initDashboard = () => (dispatch) => {
    return dispatch(getProjects())
}
