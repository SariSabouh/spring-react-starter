import React, { Component } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Dashboard from '../dashboard/Dashboard'
import Header from '../header/Header'
import AddProject from '../project/AddProject'

class App extends Component {
    render() {
        return (
            <Router>
                <div className="t-app">
                    <Header />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route exact path="/addProject" component={AddProject} />
                </div>
            </Router>
        );
    }
}

export default App;
