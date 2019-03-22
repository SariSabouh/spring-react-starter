import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './containers/app/App'
import AddProject from './containers/project/AddProject'
import Dashboard from './containers/dashboard/Dashboard'

import {initAddProject} from './containers/project/actions'
import {initDashboard} from './containers/dashboard/actions'

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
                    </App>
                </BrowserRouter>
            </Provider>
        );
    }
}
