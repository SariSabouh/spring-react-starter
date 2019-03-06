import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import App from './containers/app/App'
import AddProject from './containers/project/AddProject'

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Route path="/" component={App}>
                    <Route path="/addProject" component={AddProject} />
                </Route>
            </BrowserRouter>
        )
    }
}
