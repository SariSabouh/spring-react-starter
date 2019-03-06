import React, { Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Dashboard from '../dashboard/Dashboard'
import Header from '../header/Header'

class App extends Component {
    render() {
        return (
            <div className="t-app">
                <Header />
                <Dashboard />
            </div>
        );
    }
}

export default App;
