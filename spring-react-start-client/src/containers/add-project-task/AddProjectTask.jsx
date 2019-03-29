import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { createPropsSelector } from 'reselect-immutable-helpers'
import template from '../../template'

import { ADD_PROJECT_FORM_TASK } from '../../store/form/constants'

import {Link} from 'react-router-dom'
import FormField from '../../components/form-field'

import {addProjectTask} from './actions'

class AddProjectTask extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(formValues) {
        const {history, addProjectTask, match} = this.props
        return addProjectTask(formValues, match.params.id, history)
    }

    render() {
        const {error, handleSubmit, match} = this.props
        return (
            <div className="t-add-project-task">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to={`/projectBoard/${match.params.id}`} className="btn btn-light">Back to Project Board</Link>
                            <h4 className="display-4 text-center">Add /Update Project Task</h4>
                            <p className="lead text-center">Project Name + Project Code</p>
                            <form id={ADD_PROJECT_FORM_TASK} onSubmit={handleSubmit(this.onSubmit)} noValidate={true}>
                                {error &&
                                    <div className="u-margin-start-md u-margin-bottom-md u-color-error">
                                        {error}
                                    </div>
                                }
                                <div className="form-group">
                                    <FormField type="text" placeholder="Project Task Summary" name="summary" />
                                </div>
                                <div className="form-group">
                                    <FormField type="textarea" placeholder="Acceptance Criteria" name="acceptanceCriteria" />
                                </div>
                                <div className="form-group">
                                    <FormField type="date" label="Due Date" name="dueDate" />
                                </div>
                                <div className="form-group">
                                    <select className="form-control form-control-lg" name="priority">
                                        <option value={0}>Select Priority</option>
                                        <option value={1}>High</option>
                                        <option value={2}>Medium</option>
                                        <option value={3}>Low</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <select className="form-control form-control-lg" name="status">
                                        <option value="">Select Status</option>
                                        <option value="TO_DO">TO DO</option>
                                        <option value="IN_PROGRESS">IN PROGRESS</option>
                                        <option value="DONE">DONE</option>
                                    </select>
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

AddProjectTask.propTypes = {
    addProjectTask: PropTypes.func,
    error: PropTypes.string,
    handleSubmit: PropTypes.func
}

const AddProjectTaskForm = reduxForm({
    form: ADD_PROJECT_FORM_TASK
})(AddProjectTask)

const mapStateToProps = createPropsSelector({})

const mapDispatchToProps = {
    addProjectTask
}

export default template(connect(mapStateToProps, mapDispatchToProps)(AddProjectTaskForm))
