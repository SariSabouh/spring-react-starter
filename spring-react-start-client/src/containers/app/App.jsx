import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Header from '../header/Header'

class App extends Component {
    render() {
        return (
            <div className="t-app">
                <Header />
                <main id="app-main" className="c-app__main u-flex" role="main">
                    {this.props.children}
                </main>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.array.isRequired,
}

export default withRouter(App)
