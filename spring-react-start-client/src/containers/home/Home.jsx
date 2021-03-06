import React from 'react'

import { Link } from 'react-router-dom'

const Home = () => (
    <div className="t-home">
        <div className="light-overlay landing-inner text-dark">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h1 className="display-3 mb-4">Spring React Start Client</h1>
                        <p className="lead">Create your account to join active projects or start you own</p>
                        <hr />
                        <Link to="/register.html" className="btn btn-lg btn-primary mr-2">Sign Up</Link>
                        <Link to="/login.html" className="btn btn-lg btn-secondary mr-2">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default Home
