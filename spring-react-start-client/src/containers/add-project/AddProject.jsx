import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import template from '../../template'

import {ADD_PROJECT_FORM} from '../../store/form/constants'

import FormField from '../../components/form-field'

import {createProject, setCurrentProject} from './actions'
import {getCurrentProject} from './selectors'

class AddProject extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this)
    }

    componentWillUnmount() {
        this.props.setCurrentProject({currentProject: undefined})
    }

    onSubmit(formValues) {
        const {history, createProject} = this.props
        return createProject(formValues, history)
    }

    render() {
        const {error, handleSubmit, initialValues} = this.props
        return (
            <div className="t-add-project">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Create Project form</h5>
                            <hr />
                            <form id={ADD_PROJECT_FORM} onSubmit={handleSubmit(this.onSubmit)} noValidate={true}>
                                {error &&
                                    <div className="u-margin-start-md u-margin-bottom-md u-color-error">
                                        {error}
                                    </div>
                                }
                                <div className="form-group">
                                    <FormField type="text" placeholder="Project Name Placeholder" label="Project Name Label" name="projectName" />
                                </div>
                                <div className="form-group">
                                    <FormField disabled={initialValues !== null} type="text" placeholder="Project Identifier Placeholder" label="Project Identifier Label" name="projectIdentifier" />
                                </div>
                                <div className="form-group">
                                    <FormField type="textarea" placeholder="Project Description Placeholder" label="Project Description Label" name="description" />
                                </div>
                                <div className="form-group">
                                    <FormField type="date" placeholder="Start Date Placeholder" label="Start Date Label" name="start_date" />
                                </div>
                                <div className="form-group">
                                    <FormField type="date" placeholder="End Date Placeholder" label="End Date Label" name="end_date" />
                                </div>

                                <button type="submit" className="btn btn-primary btn-block mt-4">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

AddProject.propTypes = {
    createProject: PropTypes.func.isRequired,
    error: PropTypes.string,
    initialValues: PropTypes.object,
    handleSubmit: PropTypes.func,
    setCurrentProject: PropTypes.func
}

const AddProjectForm = reduxForm({
    form: ADD_PROJECT_FORM
})(AddProject)

const mapStateToProps = createPropsSelector({
    initialValues: getCurrentProject
})

const mapDispatchToProps = {
    createProject,
    setCurrentProject
}

export default template(connect(mapStateToProps, mapDispatchToProps)(AddProjectForm))
