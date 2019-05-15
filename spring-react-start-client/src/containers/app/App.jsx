import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import 'bootstrap/dist/css/bootstrap.min.css'

import Header from '../header/Header'

class App extends PureComponent {
    render() {
        return (
            <div className="t-app">
                <Header />
                <main id="app-main" className="c-app__main u-flex" role="main">
                    {this.props.children}
                </main>
            </div>
        )
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired,
}

export default withRouter(App)
