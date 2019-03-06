import React, { Component } from 'react'
import './App.css'

import Dashboard from '../dashboard/Dashboard'
import Header from '../header/Header'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header />
                <Dashboard />
            </div>
        );
    }
}

export default App;