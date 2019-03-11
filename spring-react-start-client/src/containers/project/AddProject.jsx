import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {createPropsSelector} from 'reselect-immutable-helpers'

import {createProject} from './actions'
import {getProjectErrors} from './selectors'

class AddProject extends Component {
    constructor(props) {
        super(props)

        this.state = {
            projectName: '',
            projectIdentifier: '',
            description: '',
            start_date: '',
            end_date: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        const {createProject, history} = this.props

        e.preventDefault()
        const newProject = {...this.state}
        createProject(newProject, history)
    }

    render() {
        const {projectName, projectIdentifier, description, start_date, end_date} = this.state
        const {projectErrors} = this.props
        return (
            <div className="t-add-project">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Create Project form</h5>
                            <hr />
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg " placeholder="Project Name"
                                        name="projectName" value={projectName} onChange={this.onChange} />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg" placeholder="Unique Project ID"
                                        name="projectIdentifier" value={projectIdentifier} onChange={this.onChange} />
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control form-control-lg" placeholder="Project Description" name="description" value={description} onChange={this.onChange} />
                                </div>
                                <h6>Start Date</h6>
                                <div className="form-group">
                                    <input type="date" className="form-control form-control-lg" name="start_date" value={start_date} onChange={this.onChange} />
                                </div>
                                <h6>Estimated End Date</h6>
                                <div className="form-group">
                                    <input type="date" className="form-control form-control-lg" name="end_date" value={end_date} onChange={this.onChange} />
                                </div>

                                <input type="submit" className="btn btn-primary btn-block mt-4" />
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
    projectErrors: PropTypes.object
}

const mapStateToProps = createPropsSelector({
    projectErrors: getProjectErrors
})

const mapDispatchToProps = {
    createProject
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProject)
