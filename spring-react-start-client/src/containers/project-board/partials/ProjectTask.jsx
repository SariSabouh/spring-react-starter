import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createPropsSelector } from 'reselect-immutable-helpers'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

const ProjecTask = ({projectSequence, summary, acceptanceCriteria, priority}) => (
    <div className="t-project-task">
        <div className="card mb-1 bg-light">
            <div className="card-header text-primary">ID: {projectSequence} -- Priority: {priority}</div>
            <div className="card-body bg-light">
                <h5 className="card-title">{summary}</h5>
                <p className="card-text text-truncate ">{acceptanceCriteria}</p>
                <Link to="#" className="btn btn-primary">View / Update</Link>
                <button className="btn btn-danger ml-4">Delete</button>
            </div>
        </div>
    </div>
)

ProjecTask.propTypes = {
    projectSequence: PropTypes.string,
    summary: PropTypes.string,
    acceptanceCriteria: PropTypes.string,
    priority: PropTypes.number,
}

const mapStateToProps = createPropsSelector({})

export default connect(mapStateToProps)(ProjecTask)
