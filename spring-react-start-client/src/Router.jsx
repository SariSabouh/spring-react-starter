import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './containers/app/App'
import AddProject from './containers/add-project/AddProject'
import Dashboard from './containers/dashboard/Dashboard'
import ProjectBoard from './containers/project-board/ProjectBoard'
import AddProjectTask from './containers/add-project-task/AddProjectTask'
import Home from './containers/home/Home'
import Login from './containers/user-management/Login'
import Register from './containers/user-management/Register'

import { initAddProject } from './containers/add-project/actions'
import { initDashboard } from './containers/dashboard/actions'
import { initProjectBoard } from './containers/project-board/actions'
import { initAddProjectTask } from './containers/add-project-task/actions'
import { initHome } from './containers/home/actions'
import { initLogin, initRegister } from './containers/user-management/actions'

export default class Router extends Component {
    render() {
        const { store } = this.props
        // TODO Think about creating a secured route .. just a maybe
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <App>
                        <Route exact path="/" render={(routeProps) => <Home dispatch={store.dispatch} {...routeProps} fetchAction={initHome} />} />
                        <Route exact path="/login(.html)?" render={(routeProps) => <Login dispatch={store.dispatch} {...routeProps} fetchAction={initLogin} />} />
                        <Route exact path="/register(.html)?" render={(routeProps) => <Register dispatch={store.dispatch} {...routeProps} fetchAction={initRegister} />} />
                        <Route exact path="/dashboard(.html)?" render={(routeProps) => <Dashboard dispatch={store.dispatch} {...routeProps} fetchAction={initDashboard} />} />
                        <Route exact path="/addProject/:id?" render={(routeProps) => <AddProject dispatch={store.dispatch} {...routeProps} fetchAction={initAddProject} />} />
                        <Route exact path="/projectBoard/:id?" render={(routeProps) => <ProjectBoard dispatch={store.dispatch} {...routeProps} fetchAction={initProjectBoard} />} />
                        <Route exact path="/addProjectTask/:id?/:sequence?" render={(routeProps) => <AddProjectTask dispatch={store.dispatch} {...routeProps} fetchAction={initAddProjectTask} />} />
                    </App>
                </BrowserRouter>
            </Provider>
        );
    }
}
