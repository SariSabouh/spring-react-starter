import React, { Component } from 'react'
import template from '../../template'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import PropTypes from 'prop-types'

import {Link} from 'react-router-dom'
import Backlog from './partials/Backlog'
import { getCurrentTaskList, getProjectNotFoundError } from './selectors';

class ProjectBoard extends Component {
    render() {
        const {tasksList, match, projectNotFoundError} = this.props
        return (
            <div className="t-project-board">
                {!projectNotFoundError ?
                    <div className="container">
                        <Link to={`/addProjectTask/${match.params.id}`} className="btn btn-primary mb-3">
                            <i className="fas fa-plus-circle"> Create Project Task</i>
                        </Link>
                        <br />
                        <hr />
                        <Backlog tasksList={tasksList} />
                    </div>
                :
                    <div className="alert alert-danger text-center container">{projectNotFoundError}</div>
                }
            </div >
        )
    }
}

ProjectBoard.propTypes = {
    projectNotFoundError: PropTypes.string,
    tasksList: PropTypes.array
}

const mapStateToProps = createPropsSelector({
    tasksList: getCurrentTaskList,
    projectNotFoundError: getProjectNotFoundError
})

export default template(connect(mapStateToProps)(ProjectBoard))
