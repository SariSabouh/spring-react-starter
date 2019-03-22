import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './containers/app/App'
import AddProject from './containers/project/AddProject'
import Dashboard from './containers/dashboard/Dashboard';
import { initDashboard } from './containers/dashboard/actions';

export default class Router extends Component {
    render() {
        const { store } = this.props
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <App>
                        <Route exact path="/" render={(routeProps) => <Dashboard dispatch={store.dispatch} {...routeProps} fetchAction={initDashboard} />} />
                        <Route path="/dashboard" render={(routeProps) => <Dashboard dispatch={store.dispatch} {...routeProps} fetchAction={initDashboard} />} />
                        <Route path="/addProject" component={AddProject} />
                    </App>
                </BrowserRouter>
            </Provider>
        );
    }
}
