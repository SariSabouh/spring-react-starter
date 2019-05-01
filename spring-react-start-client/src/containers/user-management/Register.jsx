import React, { Component } from 'react'
import PropTypes from 'prop-types'
import template from '../../template'
import {reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'

import { REGISTER_FORM } from '../../store/form/constants'

import Button from '../../components/button'
import FormField from '../../components/form-field'

import { registerUser } from './actions'

class Register extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(formValues) {
        const {history, registerUser} = this.props
        return registerUser(formValues, history)
    }

    render() {
        const {handleSubmit, error} = this.props

        return (
            <div className="t-register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your Account</p>
                            <form id={REGISTER_FORM} onSubmit={handleSubmit(this.onSubmit)} noValidate={true}>
                                {error &&
                                    <div className="u-margin-start-md u-margin-bottom-md u-color-error">
                                        {error}
                                    </div>
                                }
                                <div className="form-group">
                                    <FormField type="text" placeholder="Name" name="fullName" />
                                </div>
                                <div className="form-group">
                                    <FormField type="email" placeholder="Email Address" name="username" />

                                </div>
                                <div className="form-group">
                                    <FormField type="password" placeholder="Password" name="password" />
                                </div>
                                <div className="form-group">
                                    <FormField type="password" placeholder="Confirm Password"
                                        name="confirmPassword" />
                                </div>
                                <Button type="submit" className="btn btn-info btn-block mt-4">Submit</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Register.propTypes = {
    error: PropTypes.string,
    handleSubmit: PropTypes.func,
    registerUser: PropTypes.func
}

const RegisterForm = reduxForm({
    form: REGISTER_FORM
})(Register)

const mapStateToProps = createPropsSelector({

})

const mapDispatchToProps = {
    registerUser
}

export default template(connect(mapStateToProps, mapDispatchToProps)(RegisterForm))
