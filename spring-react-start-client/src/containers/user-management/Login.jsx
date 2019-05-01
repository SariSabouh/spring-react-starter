import React, { Component } from 'react'
import PropTypes from 'prop-types'
import template from '../../template'
import {reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'

import { LOGIN_FORM } from '../../store/form/constants'

import Button from '../../components/button'
import FormField from '../../components/form-field';

class Login extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit() {
        console.log('aa')
    }

    render() {
        const {handleSubmit, error} = this.props

        return (
            <div className="t-login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <form id={LOGIN_FORM} onSubmit={handleSubmit(this.onSubmit)} noValidate={true}>
                                {error &&
                                    <div className="u-margin-start-md u-margin-bottom-md u-color-error">
                                        {error}
                                    </div>
                                }

                                <div className="form-group">
                                    <FormField type="email" placeholder="Email Address" name="email" />
                                </div>
                                <div className="form-group">
                                    <FormField type="password" placeholder="Password" name="password" />
                                </div>
                                <Button className="btn btn-info btn-block mt-4">Submit</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    error: PropTypes.string,
    handleSubmit: PropTypes.func
}

const LoginForm = reduxForm({
    form: LOGIN_FORM
})(Login)

const mapStateToProps = createPropsSelector({

})

const mapDispatchToProps = {

}

export default template(connect(mapStateToProps, mapDispatchToProps)(LoginForm))
