import React, { Component } from 'react'

import Button from '../../components/button'
import {Link} from 'react-router-dom'

class Header extends Component {
    render() {
        return (
            <nav className="t-header navbar navbar-expand-sm navbar-dark bg-primary mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/dashboard">Personal Project Management Tool</Link>
                    <Button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon" />
                    </Button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard">Dashboard</Link>
                            </li>
                        </ul>

                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link " to="register.html">Sign Up</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="login.html">Login</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Header
