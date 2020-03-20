import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createPropsSelector } from 'reselect-immutable-helpers'

import { Link } from 'react-router-dom'
import Button from 'components/button'

import { getUsername, isUserLoggedIn } from 'store/user/selectors'
import { logout } from '../user-management/actions'

const Header = ({ username, isUserLoggedIn, logout }) => (
    <nav className="t-header navbar navbar-expand-sm navbar-dark bg-primary mb-4">
        <div className="container">
            <Link className="navbar-brand" to="/">Personal Project Management Tool</Link>
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
                        {isUserLoggedIn ?
                            <div className="nav-link fas fa-user-circle mr-1">Welcome {username}</div>
                            :
                            <Link className="nav-link " to="register.html">Sign Up</Link>
                        }
                    </li>
                    <li className="nav-item">
                        {isUserLoggedIn ?
                            <Button className="nav-link" to="/" onClick={() => { logout() }}>Logout</Button>
                            :
                            <Link className="nav-link" to="login.html">Login</Link>
                        }
                    </li>
                </ul>
            </div>
        </div>
    </nav>
)

Header.propTypes = {
    isUserLoggedIn: PropTypes.bool,
    logout: PropTypes.func,
    username: PropTypes.string
}

const mapStateToProps = createPropsSelector({
    username: getUsername,
    isUserLoggedIn
})

const mapDispatchToProps = {
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
