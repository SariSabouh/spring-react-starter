import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import Button from '../../../components/button'
import {Link} from 'react-router-dom'

import {deleteProject} from '../actions'

const ProjecTask = ({projectSequence, summary, acceptanceCriteria, priority, deleteProject, projectIdentifier}) => (
    <div className="t-project-task">
        <div className="card mb-1 bg-light">
            <div className="card-header text-primary">ID: {projectSequence} -- Priority: {priority}</div>
            <div className="card-body bg-light">
                <h5 className="card-title">{summary}</h5>
                <p className="card-text text-truncate ">{acceptanceCriteria}</p>
                <Link to="#" className="btn btn-primary">View / Update</Link>
                <Button onClick={() => { deleteProject(projectIdentifier) }} className="btn btn-danger ml-4">Delete</Button>
            </div>
        </div>
    </div>
)

ProjecTask.propTypes = {
    deleteProject: PropTypes.func,
    projectSequence: PropTypes.string,
    summary: PropTypes.string,
    acceptanceCriteria: PropTypes.string,
    priority: PropTypes.number,
    projectIdentifier: PropTypes.string
}

const mapDispatchToProps = {
    deleteProject
}

export default connect(null, mapDispatchToProps)(ProjecTask)
