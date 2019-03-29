import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './containers/app/App'
import AddProject from './containers/add-project/AddProject'
import Dashboard from './containers/dashboard/Dashboard'
import ProjectBoard from './containers/project-board/ProjectBoard'
import AddProjectTask from './containers/add-project-task/AddProjectTask'

import {initAddProject} from './containers/add-project/actions'
import {initDashboard} from './containers/dashboard/actions'
import {initProjectBoard} from './containers/project-board/actions'
import {initAddProjectTask} from './containers/add-project-task/actions'

export default class Router extends Component {
    render() {
        const { store } = this.props
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <App>
                        <Route exact path="/" render={(routeProps) => <Dashboard dispatch={store.dispatch} {...routeProps} fetchAction={initDashboard} />} />
                        <Route exact path="/dashboard" render={(routeProps) => <Dashboard dispatch={store.dispatch} {...routeProps} fetchAction={initDashboard} />} />
                        <Route exact path="/addProject/:id?" render={(routeProps) => <AddProject dispatch={store.dispatch} {...routeProps} fetchAction={initAddProject} />} />
                        <Route exact path="/projectBoard/:id?" render={(routeProps) => <ProjectBoard dispatch={store.dispatch} {...routeProps} fetchAction={initProjectBoard} />} />
                        <Route exact path="/addProjectTask/:id?" render={(routeProps) => <AddProjectTask dispatch={store.dispatch} {...routeProps} fetchAction={initAddProjectTask} />} />
                    </App>
                </BrowserRouter>
            </Provider>
        );
    }
}
